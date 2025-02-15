import NavBar from '../components/auth/nav';

const Cart=()=>{
    return(
        <>
        <NavBar/>
        <div className="w-full min-h-screen bg-neutral-800">
            <h1 className="text-3xl text-center text-white py-6">Cart</h1>
        </div>
        </>
    );
}

export default Cart;