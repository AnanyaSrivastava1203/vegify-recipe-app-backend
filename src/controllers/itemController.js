const Item=require("../model/ItemModel")

const getAllItems=async(req,res)=>{
    const result=await Item.find().sort({createAt:-1});
    res.status(200).json(result);
}


const test=async(req,res)=>{
         console.log("hellllooooooooooo worlddd !!!!!!!");
}

const getSearchedItems = async (req, res) => {
    const { q } = req.query || "";
    console.log("Search query:", q);
    try {
      let items = [];
      if (q) {
        items = await Item.find({ name: { $regex: q, $options: "i" } });
      }
      res.status(200).json(items);
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ message: "Error fetching items" });
    }
  };
  
  const getSingleItem=async(req,res)=>{
    const {id}=req.params;
    try{
       const item=await Item.findById(id);
       res.json(item);
    }catch(error){
       res.status(500).json({messsage:'No item found'});
    }
  }

module.exports={
    getAllItems,
    getSearchedItems,
    getSingleItem,
    test
}