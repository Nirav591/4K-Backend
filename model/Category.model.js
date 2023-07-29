const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
  categoryName: { type: String, required: true },
  img: { type: String, required: true },
  subCategory: [{ type: schema.Types.ObjectId, ref: 'SubCategory'}],
  status : { type: String, default: 'Active'}
});

exports.Category = mongoose.model('Category', categorySchema);

////      in frontend for image

// const handlePics = (pics)=>{
//   setLoading(true);
//   if(pics === undefined){
//     alert("Please select pictute.")
//   }
//   if(pics.type === "image/jpeg" || pics.type === "image/png" )
//   { const formData = new FormData();
//     formData.append('file',pics);
//     formData.append('upload_preset',"chat-app");
//     formData.append('cloud_name',"dwwf3vdpl");
//     fetch("https://api.cloudinary.com/v1_1/dwwf3vdpl/image/upload", { method: "post", body: formData}).then(res=> res.json()).then(data=>{ setPics(data.url.toString()); })

//     setLoading(false);
//   }else {
//     alert("Please select pictute.");
//     setLoading(false);
//   }
// }
