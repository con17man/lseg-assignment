export const generateExternalLink = (exchange, stock) => {
  // const LSEG_URL = `https://www.londonstockexchange.com/stock/${stock}/london-stock-exchange-group-plc/company-page`;
  const GOOGLE_URL = `https://www.google.com/finance/quote/${stock}:${exchange}`;

  return `Interested in finding out more about <b>${stock}</b>? <a href="${GOOGLE_URL}" class="underline underline-offset-2" target="_blank" rel="noopener noreferrer">Find out more here</a>.`;
};
