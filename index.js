/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {
    let welcomeMessage = '<prosody pitch=\"x-high\"> Welcome! <break time=\"0.7s\" /> I can read different subreddits </prosody>';
    let optionMessage = 'Would you like me to read to you posts from <break time=\"0.7s\" /> Today I learned, <break time=\"0.7s\" /> News subreddit <break time=\"0.7s\" /> Shower Thoughts <break time=\"0.7s\" /> Life Pro Tips <break time=\"0.7s\" /> World News';
    return handlerInput.responseBuilder
      .speak(welcomeMessage)
      .reprompt(optionMessage)
      .getResponse();
  },
};

const GetTILDataHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'GetTILDataIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = '';

    await getRemoteData('https://www.reddit.com/r/todayilearned/hot.json?limit=10')
      .then((response) => {
        const dataJ = JSON.parse(response);
        // outputSpeech = `Top in today I learned ${dataJ.data.children.length}`;
        for (let i = 0; i < dataJ.data.children.length; i++) {
          if (i === 0) {
            //first record
             let res1 = dataJ.data.children[i].data.title;
             let say1 = res1.replace('TIL', '');
             outputSpeech =  'First in Today I learned subreddit <break time=\"1.5s\" />' + say1 + '. ';
          } else {
            //middle record(s)
             let res2 = dataJ.data.children[i].data.title;
             let say2 = res2.replace('TIL', '');
            outputSpeech =  outputSpeech + 'Next Today I learned <break time=\"1.5s\" />' + say2 + '. ';
          }
        }
      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });

    return handlerInput.responseBuilder.speak(outputSpeech).getResponse();

  },
};

const GetNewsDataHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'GetNewsDataIntent');
  },
  async handle(handlerInput) {
    let newsSpeech = '';

    await getRemoteData('https://www.reddit.com/r/news/hot.json?limit=10')
      .then((response) => {
        const dataJ = JSON.parse(response);
        for (let i = 0; i < dataJ.data.children.length; i++) {
          if (i === 0) {
            //first record
             let res1 = dataJ.data.children[i].data.title;
             newsSpeech =  '<voice name=\"Amy\"> First in News subreddit <break time=\"1.5s\" />' + res1 + '. ';
             // other records
          } else {
             let res2 = dataJ.data.children[i].data.title;
             newsSpeech =  newsSpeech + 'Next <break time=\"1.5s\" />' + res2 +  '. ';
          }
        }
      })
      .catch((err) => {
      });

    return handlerInput.responseBuilder.speak(newsSpeech + '</voice>').getResponse();

  },
};
const GetShowerDataHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'GetShowerDataIntent');
  },
  async handle(handlerInput) {
    let showerSpeech = '';

    await getRemoteData('https://www.reddit.com/r/Showerthoughts/hot.json?limit=10')
      .then((response) => {
        const dataJ = JSON.parse(response);
        for (let i = 0; i < dataJ.data.children.length; i++) {
          if (i === 0) {
            //first record
             let res1 = dataJ.data.children[i].data.title;
             showerSpeech =  'First in Shower Thoughts subreddit <break time=\"1.5s\" />' + res1 + '. ';
             // other records
          } else {
             let res2 = dataJ.data.children[i].data.title;
             showerSpeech =  showerSpeech + 'Next <break time=\"1.5s\" />' + res2 +  '. ';
          }
        }
      })
      .catch((err) => {
      });

    return handlerInput.responseBuilder.speak(showerSpeech).getResponse();

  },
};
const GetLPTDataHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'GetLPTDataIntent');
  },
  async handle(handlerInput) {
    let showerSpeech = '';

    await getRemoteData('https://www.reddit.com/r/LifeProTips/hot.json?limit=10')
      .then((response) => {
        const dataJ = JSON.parse(response);
        for (let i = 0; i < dataJ.data.children.length; i++) {
          if (i === 0) {
            //first record
             let res1 = dataJ.data.children[i].data.title;
             showerSpeech =  'First in Life Pro Tips subreddit <break time=\"1.5s\" />' + res1 + '. ';
             // other records
          } else {
             let res2 = dataJ.data.children[i].data.title;
             showerSpeech =  showerSpeech + 'Next <break time=\"1.5s\" />' + res2 +  '. ';
          }
        }
      })
      .catch((err) => {
      });

    return handlerInput.responseBuilder.speak(showerSpeech).getResponse();

  },
};
const GetWorldNewsDataHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'GetWorldNewsDataIntent');
  },
  async handle(handlerInput) {
    let newsSpeech = '';

    await getRemoteData('https://www.reddit.com/r/worldnews/hot.json?limit=10')
      .then((response) => {
        const dataJ = JSON.parse(response);
        for (let i = 0; i < dataJ.data.children.length; i++) {
          if (i === 0) {
            //first record
             let res1 = dataJ.data.children[i].data.title;
             newsSpeech =  '<voice name=\"Amy\"> First in World News subreddit <break time=\"1.5s\" />' + res1 + '. ';
             // other records
          } else {
             let res2 = dataJ.data.children[i].data.title;
             newsSpeech =  newsSpeech + 'Next <break time=\"1.5s\" />' + res2 +  '. ';
          }
        }
      })
      .catch((err) => {
      });

    return handlerInput.responseBuilder.speak(newsSpeech + '</voice>').getResponse();

  },
};


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can introduce yourself by telling me your name';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const getRemoteData = function (url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? require('https') : require('http');
    const request = client.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed with status code: ' + response.statusCode));
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err));
  });
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    GetTILDataHandler,
    GetNewsDataHandler,
    GetShowerDataHandler,
    GetLPTDataHandler,
    GetWorldNewsDataHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
