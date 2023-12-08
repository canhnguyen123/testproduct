const { response } = require('express');
const productModel=require('../model/productModel');
exports.list=(req,res)=>{
    productModel.list((error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query error' });
        }
        const arr= results.map((item,index)=>{
            return{
                id:item.product_id,
                name:item.product_name,
                price:item.product_price,
                img:item.product_img,
                describe:item.product_describe,
                create_ad:item.create_ad,
                updated_at:item.updated_at,
            }
        })
        if(results){
            return res.json({ status: 'success', mess:"Lấy thành công",result:arr });
        }
        return res.json({ status: 'success', mess:"Lấy thất bại" });
    })
}
exports.add=(req,res)=>{
    const name=req.body.nameproduct;
    const img=req.body.img;
    const price=Number(req.body.price);
    const describe=req.body.describe;
    const data={
        product_name:name,
        product_price:price,
        product_describe:describe,
        product_img:img,
        create_ad:new Date()
    }
    productModel.add((error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query error' });
        }
    
        if(results){
            return res.json({ status: 'success', mess:"Thêm thành công" });
        }
        return res.json({ status: 'success', mess:"Thêm thất bại" });
    },data)
}
exports.update=(req,res)=>{
    const product_id=req.params.product_id;
    const name=req.body.nameproduct;
    const img=req.body.img;
    const price=Number(req.body.price);
    const describe=req.body.describe;
    const data={
        product_name:name,
        product_price:price,
        product_describe:describe,
        product_img:img,
        updated_at:new Date()
    }
    productModel.update((error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query error' });
        }
    
        if(results){
            return res.json({ status: 'success', mess:"Cập nhật thành công" });
        }
        return res.json({ status: 'success', mess:"Cập nhật thất bại" });
    },data,product_id)
}
exports.deleteId=(req,res)=>{
    const product_id=req.params.product_id;
    productModel.delete((error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database query error' });
        }
    
        if(results){
            return res.json({ status: 'success', mess:"Xóa thành công" });
        }
        return res.json({ status: 'success', mess:"Xóa thất bại" });
    },product_id)
}