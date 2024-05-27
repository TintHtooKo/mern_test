const removeFile = async(path) => {
    let fileExist;
            try {
                await fs.access(path)
                fileExist = true;
            } catch (e) {
                fileExist = false;
            }

            if(fileExist){
                fs.unlink(path)
            }
}

module.exports = removeFile