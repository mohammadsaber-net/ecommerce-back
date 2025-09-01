import multer from "multer"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const fileName=`user-${Date.now()}.${file.mimetype.split("/")[1]}`
    cb(null, fileName);
  }
});
const fileFilter =(req,file,cb,next)=>{
    const imageType=file.mimetype.split("/")[0]
    if(imageType==="image"){
        return cb(null,true)
    }
    if(imageType!=="image"){
        console.log("imageType is" ,imageType)
        return cb(new Error("Only images are allowed!"), false);
    }
}
export const upload = multer({ storage,fileFilter})