const db = require('../Module/db'); 

const GetAllProducts = async(req , res , next ) =>{ 
    try{
        const [data] = await db.query('SELECT name , img_source , price  FROM Products ;');
        if(!data || !Array.isArray(data)) {
            res.status(400).json({
                success: false , 
                message : "DATA IS NOT FOUND "
            });
        }
        else {
            res.status(200).json({
                success:true ,
                message:"Data send successfully",
                data: data
            });
        }
    }
    catch(err){
        next(err);
    }
}


const GetProductById = async(req , res , next ) =>{ 
    try{
        const id = req.params.id ;
        const [data] = await db.query('SELECT* FROM Products where id =  ? ;',[id]);
        if(!data || !Array.isArray(data)) {
            res.status(400).json({
                success: false , 
                message : "DATA IS NOT FOUND "
            });
        }
        else {
            res.status(200).json({
                success:true ,
                message:"Data send successfully",
                data: data
            });
        }
    }
    catch(err){
        next(err);
    }
}

const CreateProduct = async (req, res, next) => {
    try {
        const { name, img_source, price } = req.body;

     
        if (!name || !img_source || !price) {
            return res.status(400).json({
                success: false,
                message: "Data not found, please provide all required fields."
            });
        }

      
        const query = "INSERT INTO Products (name, img_source, price) VALUES (?, ?, ?)";
        const [data] = await db.query(query, [name, img_source, price]);

      
        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: { id: data.insertId, name, img_source, price }  
        });

    } catch (err) {
        next(err);  
    }
};


const UpdateProduct = async (req, res, next) => {
    try {
        const { id, name, img_source, price } = req.body;

        if (!id || !name || !img_source || !price) {
            return res.status(400).json({
                success: false,
                message: "Data not found, please provide all required fields including ID."
            });
        }

        const query = "UPDATE Products SET name = ?, img_source = ?, price = ? WHERE id = ?";
        const [data] = await db.query(query, [name, img_source, price, id]);

        if (data.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found or no changes applied."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: { id, name, img_source, price }
        });

    } catch (err) {
        next(err); 
    }
};
 

const DeleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const query = "DELETE FROM Products WHERE id = ?";
        const [data] = await db.query(query, [id]);

        if (data.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (err) {
        next(err);  
    }
};

 
module.exports = {CreateProduct , GetProductById, UpdateProduct ,GetAllProducts , DeleteProduct} ; 