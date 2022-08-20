

// exports.create = (req,res)=>{
//     res.send({message:"create handle"})
// }
// exports.findAll = (req,res)=>{
//     res.send({message:"findAll"})
// }
// exports.findOne = (req,res)=>{
//     res.send({message:"find One"})
// }
// exports.update = (req,res)=>{
//     res.send({message:"Update"})
// }
// exports.delete = (req,res)=>{
//     res.send({message:"Delete"})
// }
// exports.deleteAll  = (req,res)=>{
//     res.send({message:"DeleteAll"})
// }
// exports.findAllFavorite = (req,res)=>{
//     res.send({message:"findAllFavorite handle"})
// }

const ContactService = require("../services/contact.service")
const MongoDB = require("../utils/mongodb.utils")
const ApiError = require("../api-error");
const { reset } = require("nodemon");





exports.create = async (req,res,next) => {

    if (!req.body?.name){
        return next(new ApiError(400,"Name can not be empty"))
    }

    try {
       
        const contactService = new ContactService(MongoDB.client);
        
        const document = await contactService.create(req.body);
        
        return res.send(document)

    }catch(error){
        return next(
            new ApiError(500,"An error occurred while creating the contact")
        )
    }


}






exports.findAll = async (req,res,next)=>{
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const {name} =req.body
         
        // req.query
        if (name){
            documents = await contactService.findByName(name);
        }
        else{
            documents = await contactService.find({})
        }
    



    }catch(error){
        return next(
            new ApiError(500,"An error occurred while  the contact")
        )
    }
    return res.send(documents)

}



exports.findOne = async (req,res,next)=>{
    
    try {
        const contactService = new ContactService(MongoDB.client);
    
        const document = await contactService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Contact not found"))
        }
        return res.send(document)
       



    }catch(error){
        return next(
            new ApiError(500,"An error occurred while  the contact")
        )
    }
    

}
exports.update = async (req,res,next)=>{
        if(Object.keys(req.body).length==0){
            return next(new ApiError(400,"Data to update can not be empty"))
        }
    try {
        const contactService = new ContactService(MongoDB.client);
    
        const document = await contactService.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError(404,"Contact not found"))
        }
        return res.send({message:"Contact was updated successfully"})
       



    }catch(error){
        return next(
            new ApiError(500,"An error occurred while  the contact")
        )
    }
    

}
exports.delete = async (req,res,next)=>{
  
try {
    const contactService = new ContactService(MongoDB.client);

    const document = await contactService.delete(req.params.id);
    if(!document){
        return next(new ApiError(404,"Contact not found"))
    }
    return res.send({message:"Contact was delete successfully"})
   



}catch(error){
    return next(
        new ApiError(500,"An error occurred while  the contact")
    )
}


}
exports.findAllFavorite = async (req,res,next)=>{
    
    try {
        const contactService = new ContactService(MongoDB.client);
    
        const document = await contactService.findFavorite();
        
        return res.send(document)
       



    }catch(error){
        return next(
            new ApiError(500,"An error occurred while  the contact")
        )
    }
    

}
exports.deleteAll = async (req,res,next)=>{
    
    try {
        const contactService = new ContactService(MongoDB.client);
    
        const deleteCount = await contactService.deleteAll();
        
        return res.send(
            {
                message:`${deleteCount} contacts were deleted successfully`
            }
            )
       



    }catch(error){
        return next(
            new ApiError(500,"An error occurred while  the contact")
        )
    }
    

}