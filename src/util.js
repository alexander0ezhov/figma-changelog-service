const connect = require("./db/dbConnect");

const wrongSymbols = ['.', "+", "(", ")", "-", "="]

const getTitle = (link, name) => link ? `[${name}](${link})` : `*${name}`
const getCharacters = (row, index) => row.children[index].children[0].children[0].characters
const optimizer = (text, needle)=>text.split(needle).join(`\\${needle}`)
const optimizeTBUrl = (text) => wrongSymbols.reduce((acc, current, index)=>index > 1 ? optimizer(acc, current) : optimizer(text, acc))

module.exports = {
    toStringDate: (date) => ("" + date).split("GMT")[0].trim(),
    getNeedle: (child, name, type) => child?.name?.toUpperCase() === name.toUpperCase()
        && child?.type?.toUpperCase() === type.toUpperCase(),
    getRowsData: ( rows , fileName) => rows.map(row => {
        const newDate = row.children[0].children[0].children[0].characters
        const dateArray = newDate.split(".");
        return {
            date: dateArray && [dateArray[1], dateArray[0], dateArray[2]].join("/"),
            name: getCharacters(row, 1),
            description: getCharacters(row, 2),
            link: getCharacters(row, 3),
            file: fileName
        }
    }),
    getDiffer: async (data) => {
        const dataCycle = data
            .map(({ date, file, name, link, description }, i) => {
                const select = `SELECT '${file || null}' as file, CAST('${
                    date || null
                }' as DATE), '${name || null}' as name, '${link || null}' as link, '${
                    description || null
                }' as description
`;
                return i ? `UNION ALL ${select}` : select;
            })
            .join("");
        return await connect
            .query(
                `INSERT INTO figma.figma_changelogs as ch (file,date,name,link,description) (
SELECT * FROM (
${dataCycle}
) as t WHERE t.file||t.name||t.description NOT IN (SELECT file||name||description FROM figma.figma_changelogs))
RETURNING file, date, name, link, description`
            )
            .then((result) => result[0]);
    },
    getDifferText: (data) =>
        data &&
        data
            .map(
                ({ date, name, description, link }) => `${optimizeTBUrl(date
                    .split("-")
                    .reverse()
                    .join("."))}
${getTitle(link, name)}
${optimizeTBUrl(description)}

`
            )
            .join(""),
    joinChangelogs: (logs) => logs.join(""),
    optimizeTBUrl
}