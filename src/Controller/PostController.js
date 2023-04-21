const postModel= require("../Model/postModel")



 const createPost = async(req,res)=>{
    try {
        let { userId,img,like,comment,Dimonds} = req.body

        if (Object.keys(req.body).length == 0)
        return res.status(400).send({ status: false, msg: "Please Enter Book Details For Updating" })

    if (!userId) {
        return res.status(400).send({ status: false, msg: "userid must be present" })
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ status: false, msg: `this user Id is not a valid Id` })
    }

    if (!img) {
        return res.status(400).send({ status: false, msg: "img must be present" });
    }
    if (like) {
        return res.status(400).send({ status: true });
    }
    if (comment) {
        return res.status(400).send({ status:true });
    }
    if (!Dimonds) {
        return res.status(400).send({ status:true});
    }



        
    } catch (error) {
        
    }
 }