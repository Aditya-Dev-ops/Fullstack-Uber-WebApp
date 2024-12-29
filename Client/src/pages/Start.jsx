import {Link} from 'react-router-dom'

const Start = () => {
  return (
    <div>
       <div className="bg-[url('https://images.unsplash.com/photo-1506976773555-b3da30a63b57?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-right-bottom h-screen flex justify-between flex-col  w-full bg-red-400 ">
          <img className="w-20 ml-6 mt-12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png" alt=""/>
         <div className="bg-white py-4 px-4 pb-7">
            <h2 className="text-3xl font-bold">Get Started with Uber</h2>
            <Link to="/login" className='flex justify-center items-center  bg-black w-full text-white py-3 rounded mt-5'>Continue</Link>
         </div>
       </div>
    </div>
  )
}

export default Start