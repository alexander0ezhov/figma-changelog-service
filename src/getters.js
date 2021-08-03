const { getNeedle, getRowsData, getDiffer, getDifferText } = require("./util");

const { personalAccessToken, files } = require("../config.json");
const { payments } = files;
const Figma = require("figma-api");
const FigmaApi = new Figma.Api({ personalAccessToken });

async function getCanvasData(file, fileName, title, subTitle, chatName) {
    const canvas = file.document.children.find(child => getNeedle(child, title, "CANVAS"));
    const block = canvas.children.find(child =>  getNeedle(child, subTitle, "FRAME"));
    const table = block.children.find(child =>  getNeedle(child, 'TABLE', "FRAME"));
    const rows = table.children.filter(child => getNeedle(child, 'TABLE-ROW', 'FRAME'))
    const rowsData = getRowsData(rows, fileName);
    const differ = await getDiffer(rowsData)
    const differText = getDifferText(differ)
    return differText
        ? `${chatName}

${differText}
`
        : "";
}

async function getPaymentsChangelog() {
    const file = await FigmaApi.getFile(payments);
    const pmnt = await getCanvasData(file, `${payments}-pmnt` ,'', '', '');
    return pmnt
}

module.exports = {
    getPaymentsChangelog
}