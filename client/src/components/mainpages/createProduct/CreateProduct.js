import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {GlobalState} from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories

    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [products] = state.productAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productAPI.callback

    useEffect(()=> {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id){
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages([])
        }
    }, [param.id, products])

    const handleUpload = async e =>{
        try {
            let newImage = []
            let num = 0
            if(!isAdmin) return alert("You're not an Admin")
            const file =[...e.target.files]

            file.forEach( files => {
                if(!files) return alert("File not exits.")

                if(files.size > 1024 * 1024) //1mb
                return alert("Size too large!")

                if(files.type !== 'image/jpeg' && files.type !== 'image/png')
                return alert("File format is incorrect.")

                num += 1;
                if(num <= 4) newImage.push(files)
                return newImage;
            })
           // console.log(newImage)
            let formData = new FormData()
            newImage.forEach( image => {
                formData.append('file',image)
            })
            
            
            setLoading(true)
            const res = await axios.post('/api/upload', formData , {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            console.log(res.data)
            setLoading(false)
            setImages(res.data.response)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = index =>{
        try {
           /* if(!isAdmin) return alert("You're not an Admin")
                setLoading(true)
                await axios.post('/api/destroy', {public_id: images.public_id}, {
                    headers: {Authorization: token}
                })
                setImages([])
                setLoading(false)*/
                const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit =async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an Admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product, images}, {
                    headers:{Authorization:token}
                })
            }else{
                await axios.post('/api/products', {...product, images}, {
                    headers:{Authorization:token}
                })   
            }
            setCallback(!callback)
            history.push("/")

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    return (
        <div className="create_product">
            <div className = "upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} multiple accept="image/*"/>
                {
                    loading ?<div id="file_img"><Loading /></div>
                           :<div className="row">
                             {
                                 images.map((img, index) => (
                                     //console.log(img)
                                    <div key={index} id="file_img" style={styleUpload}>
                                    <img src={img.url ? img.url : ''} alt={img.url ? img.url : ''}/>
                                    <span onClick={handleDestroy}>x</span>
                                    </div> 
                                 ))
                             }
                            </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor= "product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                    value={product.product_id} onChange={handleChangeInput} disabled={onEdit}/>
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} rows="1" onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="content">Brand Name</label>
                    <textarea type="text" name="content" id="content" required
                    value={product.content} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories:</label>
                    <select name = "category" value={product.category} onChange={handleChangeInput}>
                        <option value="">Please Select a category</option>
                        {
                            categories.map(category => (
                                <option value={category.name} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
        </div> 
    );
}

export default CreateProduct;