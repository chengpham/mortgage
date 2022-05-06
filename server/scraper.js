const cheerio = require("cheerio");
const axios = require("axios").default;
const fethHtml = async url => {
  try { const { data } = await axios.get(url); return data;
  } catch { console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`); }
};

const extractRatehub = selector => {
    const provider = selector.find(".main-detail > p").text().trim()
    const results = selector.find(".rate > p").text().replace(/Prime\s\-*\d\.\d{2}/,'').trim().split("%")
    const fiveYearVariable = parseFloat(results[0])
    const fiveYearFixed = parseFloat(results[1])
    const threeYearFixed = parseFloat(results[2])
    return { provider, fiveYearVariable, fiveYearFixed, threeYearFixed };
};
const extractHSBC = selector => {
  const results = []
  results.push(selector.text().replace(/\(HSBC\sPrime\sRate.\s\-*\d\.\d{2}\%\)|\%/g,'').trim())
  return results
};
const extractVancity = selector => {
  const results = []
  results.push(selector.find("td[class='value']").text().replace(/\%\d*/,'') )
  return results
};
const extractSimplii = selector => {
  const results = []
  if (/\d\.\d{2}\%/.test(selector.text())) results.push(selector.text().replace(/\%/,'') )
  return results
};

const scrapRatehub = async () => {
  const ratehubURL = "https://www.ratehub.ca/banks/bank-mortgage-rates";
  const html = await fethHtml(ratehubURL);
  const selector = cheerio.load(html);
  const rates = selector("body")
    .find(".table-container > table > tbody > tr")
    .map((idx, el)=>extractRatehub(selector(el)))
    .get();
  return rates.slice(1);
};
const scrapHSBC = async () => {
  const hsbcURL = "https://www.hsbc.ca/mortgages/rates/";
  const html = await fethHtml(hsbcURL);
  const selector = cheerio.load(html);
  const rates = selector("#content_main_basicTable_1")
    .find("table > thead > tr > td")
    .map((idx, el)=>extractHSBC(selector(el)))
    .get();
  return {provider: "HSBC", fiveYearVariable: parseFloat(rates[9]), fiveYearFixed: parseFloat(rates[5]), threeYearFixed: parseFloat(rates[3])};
};
const scrapVancity = async () => {
  const vancityURL = "https://www.vancity.com/Rates/Mortgages/?xcid=pers_megamenu_mortrate";
  const html = await fethHtml(vancityURL);
  const selector = cheerio.load(html);
  const rates = selector("table")
    .find("tbody > tr")
    .map((idx, el)=>extractVancity(selector(el)))
    .get();
  return { provider: "Vancity", fiveYearVariable: parseFloat(rates[15]), fiveYearFixed: parseFloat(rates[0]), threeYearFixed: parseFloat(rates[5]) };
};
const scrapSimplii = async () => {
  const simpliiURL = "https://www.simplii.com/en/rates/mortgage-rates.html";
  const html = await fethHtml(simpliiURL);
  const selector = cheerio.load(html);
  const rates = selector("table.accent-blue-dash:first-of-type")
    .find("tbody > tr > td > span")
    .map((idx, el)=>extractSimplii(selector(el)))
    .get();
  return { provider: "Simplii Financial", fiveYearVariable: parseFloat(rates[10]), fiveYearFixed: parseFloat(rates[6]), threeYearFixed: parseFloat(rates[2]) };
};
const scrapTangerine = async () => {
  const tangerineURL = "https://www.tangerine.ca/json/currentRates.json";
  const rates = await fethHtml(tangerineURL);
  return { provider: "Tangerine", fiveYearVariable: rates["rates"][87].interest_rate, fiveYearFixed: rates["rates"][84].interest_rate, threeYearFixed: rates["rates"][82].interest_rate };
};
module.exports = { scrapRatehub, scrapHSBC, scrapVancity, scrapSimplii, scrapTangerine };