import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../../context/cartContaxt';

export default function Checkout() {

    let { onlinePaymenit } = useContext(CartContext)

    async function paymnet(values) {
        console.log("hi ", values);
        let { data } = await onlinePaymenit(values)
        console.log(data);
        window.location.href = data.session.url
    }
    let formik = useFormik({
        initialValues: {
            "details": "",
            "phone": "",
            "city": ""
        },
        onSubmit: paymnet
    })

    return (
        <>
            <div className="container mx-auto bg-main-light p-5">
                <div className=""></div>
                <h2>Shopping Address</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group mp-3">
                        <label htmlFor="details">Details</label>
                        <input type="text" className='form-control' id='details' value={formik.values.details} onChange={formik.handleChange} />
                    </div>
                    <div className="form-group mp-3">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" className='form-control' id='phone' value={formik.values.phone} onChange={formik.handleChange} />
                    </div>
                    <div className="form-group mp-3">
                        <label htmlFor="city">City</label>
                        <input type="text" className='form-control' id='city' value={formik.values.city} onChange={formik.handleChange} />
                    </div>
                    <button className='btn bg-main w-50 mt-4 text-white'>Pay now :D</button>
                </form>
            </div>
        </>
    )
}
