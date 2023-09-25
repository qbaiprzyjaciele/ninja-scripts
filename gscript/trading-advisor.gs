const URL = '';
const SPREADSHEET_ID = '';
const SHEET_NAME = '';

function finances() {
  var res = UrlFetchApp.fetch(URL);
  const htmlContent = res.getContentText();
  const matched = htmlContent.match(/<div class="profilLast">(.*?)<\/div>/);
  if(matched) {
    console.log(matched[1]);
    const aValueMatches = matched[1].match(/[0-9,]+/g);
    const valueFormatted = aValueMatches.join('');
    const spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if(!isNaN(parseFloat(valueFormatted))) {
      spreadSheet.appendRow([valueFormatted]);
    }
    console.log('slope:' + linearRegressionSlope([{x:1, y:4}, {x:2, y:3}, {x:3, y:4.5}, {x:4, y:4}]));
  } else {
    console.log('no math found');
  }
}

function linearRegressionSlope(values) {
  let ySum = 0;
  let xSum = 0;
  for(let i=0; i<values.length; i++) {
    ySum += values[i].y;
    xSum += values[i].x;
  } 
  const yMean = ySum/values.length;
  const xMean = xSum/values.length;

  let sumMultiplication = 0;
  let sumDiff = 0;

  for(let i=0; i<values.length; i++) {
    sumMultiplication += (values[i].x - xMean)*(values[i].y - yMean);
    const diff = (values[i].x - xMean);
    sumDiff += diff*diff;
  }
  return sumMultiplication / sumDiff;
}

function shouldRun() {
  return [1,2,3,4,5].includes(new Date().getDay());
}

function getNotificationRules() {
  const spreadSheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const configParams = spreadSheet.getRange('F4:I6').getValues();
  const notificationRules = [];

  for(let i=0; i<configParams.length; i++) {
    const row = configParams[i];
    const paramName = row[0];
    const value = row[1];
    const functionName = row[2];
    const message = row[3];

    if(!(paramName && ['slope', 'price'].includes(paramName))) {
      continue;
    }
    if(!(value && !isNaN(parseFloat(value)))) {
      continue;
    }
    if(!(functionName && ['lt','gt', 'lte', 'gte', 'eq'].includes(functionName))) {
      continue;
    }
    if(!message) {
      continue;
    }
    notificationRules.push({
      param: paramName, 
      value: value,
      functionName: functionName, 
      message: message
    });
  }
}

function evalNotificationRules(notificationRules, variables) {
  const messegesToSend = [];
  for(let i=0; i<notificationRules.length; i++) {
    const rule = notificationRules[i];
    const paramValue = variables[rule.param];
    if(evalNumFunction(rule.functionName, paramValue, value)) {
      messegesToSend.push(rule.message);
    }
  }
  return messegesToSend;
}

function evalNumFunction(functionName, paramValue, value) {
  const functions = {
    lt: function(pv, v) {
      return pv < v;
    },
    lte: function(pv, v) {
      return pv <= v;
    },
    gt: function(pv, v) {
      return pv > v;
    },
    gte: function(pv, v) {
      return pv >= v;
    },
    eq: function(pv, v) {
      return pv == v;
    }
  }
  return functions[functionName](paramValue, value);
}


