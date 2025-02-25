const Groq = require('groq-sdk');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const client = new Groq({
    apiKey: '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', 
});
async function extractTextFromPDF(pdfPath) {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    return data.text; // Returns extracted text
}

let text=""
extractTextFromPDF('r1.pdf').then(text=>{
    main(text)
})



async function main(data) {
    const chatCompletion = await client.chat.completions.create({
        messages: [{
            role: 'user', content: data+"Extract the data from the string and return it in a json format without any other text" }],
        model: "gemma2-9b-it",
    });

    const extractData=chatCompletion.choices[0].message.content
    let startIndex=extractData.indexOf("{");
    let endIndex=extractData.lastIndexOf("}");
    let jsonData=extractData.substring(startIndex,endIndex+1);
    jsonData=jsonData.trim();
    // console.log(jsonData);
    const jsonObject=JSON.parse(jsonData);
    console.log(jsonObject);
    return jsonObject;
}