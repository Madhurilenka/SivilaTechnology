const userModel = require('../Model/userModel')



//==============================createUser=====================================//



const createUser = async (req, res) => {
    try {
        let { name, phone, email, password } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, msg: "for registration user data is required" })
        }

        if (!name) {
            return res.status(400).send({ status: false, msg: "Enter your  Name" });
        }
          
         if (!(/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/).test(name)) {
            return res.status(400).send({ status: false, msg: "Please enter a valid Name" })
        }

        if (!phone) {
            return res.status(400).send({ status: false, msg: "Enter your phone Number. Its mandatory" })
        }
        if (!(/^[\s]*[6-9]\d{9}[\s]*$/).test(phone)) {
            return res.status(400).send({ status: false, msg: "Please Enter valid phone Number" })
        }


        let existphone = await userModel.findOne({ phone: phone })
        if (existphone) { return res.status(400).send({ status: false, msg: "User with this phone number is already registered." }) }


        if (!email) {
            return res.status(400).send({ status: false, msg: "Enter your email .Its mandatory for registration!!!" })
        }
            if (!(/^[a-z0-9_]{1,}@[a-z]{3,10}[.]{1}[a-z]{3}$/).test(email)) {
            return res.status(400).send({ status: false, msg: "Please Enter valid Email" })
        }
        
        let existEmail = await userModel.findOne({ email: email })
        if (existEmail) {

            return res.status(400).send({ status: false, msg: "User with this email is already registered" })
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: "Please enter Password for registartion" })
        }

        if (!(/^[\s]*[0-9a-zA-Z@#$%^&*]{8,15}[\s]*$/).test(password)) {                                            

            return res.status(400).send({ status: false, msg: "please Enter valid Password and it's length should be 8-15" })
        }

        let savedData = await userModel.create(req.body);
        return res.status(201).send({ status: true, message: 'Success', data: savedData });


    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}


 const createLikes = async(req,res)=>{
    try {
        let param = req.params.id

        if (!mongoose.Types.ObjectId.isValid(param))
        return res.status(400).send({ status: false, msg: "Please enter valid path Id" });

    let finduser = await userModel.findById(param).select({ __v: 0, deletedAt: 0, })
    if (!finduser) {
        return res.status(400).send({ status: false, msg: " enter a wrong userid" })
    }
    let { likes,comments, userId, Diamonds} = req.body

    if (Object.keys(req.body).length == 0) {
        return res.status(400).send({ status: false, msg: "You have to put details for create a user" })
    }
       if(likes){
        return res.status(200).send({status:true})
       }
        if (!userId) {
            return res.status(400).send({ status: false, msg: "give user id" })
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, msg: `please enter a valid userID` })
        }
        let extra = await userModel.findOne({userId:userId})
        let arr1 = extra.likes

       
         if(extra){
            arr1.push(likes)
            let dataforupdate ={"likes":arr1,"count":extra.count+1}
         let final = await userModel.findOneAndUpdate({userId:userId},{ $set: dataforupdate },{new:true})
        
        return res.status(201).send({ status: true, message: "success", data: final })
         }
        
        if (!(likes))
            return res.status(400).send({ status: false, msg: "Plese enter link" })
            let itemforadd ={
                "likes":likes,
                 
                  "userId":userId,
                
                   "count":1
            }
        let addlike = await userModel.create(itemforadd)

        finduser.likes = finduser.likes + 1
        await finduser.save()
        let printLike= await userModel.findOne({ _id: addlike }).select({ __v: 0, createdAt: 0, updatedAt: 0 })
        finduser = finduser.toObject()

        finduser = printLike
        return res.status(201).send({ status: true, message: "success", data: finduser })
    } catch (err) { res.status(500).send({ status: false, msg: err.message }) }
}

   




module.exports.createUser = createUser