const { json } = require("express");
const fs = require("fs");

function getTodos(fileName, response) {
  fs.readFile(`./data/${fileName}.json`, "utf8",(err, data) => {
    if (err) {
      console.log(err);
      response.json({ message: err.message || "Problem in fetching" });
    } else if (data) {
      console.log("File Fetched " + fileName);
      response.json({ message: "Data fetched successfully", data });
    
    } else {
      response.json({ message: "Data missing" });
    }
  });
}

function setTodos({ fileNameFrom, fileNameTo, id, response }) {
  fs.readFile(`./data/${fileNameFrom}.json`, "utf8", (err, fromData) => {
    if (err) {
      console.log(`Error in ${fileNameFrom} write file`);
    } else {
      const fromTodos = JSON.parse(fromData);
      const todoIndex = fromTodos.findIndex((el) => el.id == id);

      if (todoIndex === -1) {
        response.send("Invalid id");
      } else {
        const updatedFromTodos = fromTodos.filter(
          (el, index) => index != todoIndex
        );

        fs.writeFile(
          `./data/${fileNameFrom}.json`,
          JSON.stringify(updatedFromTodos, null, 2),
          (err) => {
            if (err) {
              console.log(`Error in ${fileNameFrom} write file`);
            } else {
              console.log(`File changed in ${fileNameFrom}`);
            }
          }
        );

        if (fileNameTo) {
          fs.readFile(`./data/${fileNameTo}.json`, "utf8", (err, toData) => {
            if (err) {
              console.log(`Error in ${fileNameTo} read file`);
            } else {
              const updatedToTodos = [
                fromTodos[todoIndex],
                ...JSON.parse(toData),
              ];
              fs.writeFile(
                `./data/${fileNameTo}.json`,
                JSON.stringify(updatedToTodos, null, 2),
                (err) => {
                  if (err) {
                    console.log(`Error in ${fileNameTo} write file`);
                  } else {
                    response.json({
                      message: `Successfully deleted from ${fileNameFrom} and added to ${fileNameTo}`,
                      from: updatedFromTodos,
                      to: updatedToTodos,
                    });
                  }
                }
              );
            }
          });
        } else {
          response.json({
            message: `Successfully modified ${fileNameFrom}`,
            updatedFromTodos,
          });
        }
      }
    }
  });
}

module.exports = { getTodos, setTodos };
