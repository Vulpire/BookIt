import React, { useEffect, useState } from 'react'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
const CreateGroup = () => {
    let handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api', {
          method: 'POST', 
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(
            {title: title,
              start: startValue,
              end: endValue,
          })
        }).then(res=>{
          if(res.status !== 200){
            setMessage("There was a problem")
          }
        })
      };
    const [initialState, setInitialState] = useState();
    useEffect(()=>{
        fetch('/api').then(res=>{
            if(res.ok){
                let json = res.json()
                console.log(json);
                return json
            }
        }).then(jsonResponse => setInitialState(jsonResponse))
    }, [])
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [startValue, onStartChange] = useState(new Date());
    const [endValue, onEndChange] = useState(new Date());
    return(
        <div>      
      <div className="flex flex-col items-center min-h-screen pt-6 justify-center sm:pt-0 bg-gray-50">
        <div>
          {/* <MdEventAvailable href='/' className='h-24 w-24'/>           */}
          </div>
            <div className="w-full px-6 py-4 mt-6 bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md sm:max-w-md sm:rounded-lg h-6/8 overflow-visible ">
            <div className="items-center justify-center flex text-white"><AiOutlineUsergroupAdd href='/' className='h-24 w-24'/></div>  
            <p className='block text-sm font-bold black undefined text-center bold text-white'>Create new Group</p>

              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white undefined"
                  >
                    Title
                  </label>
                    <div className="flex flex-col items-start">
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name="title"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white undefined"
                  >
                    Members
                  </label>
                    <div className="flex flex-col items-start">
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name="members"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white undefined"
                  >
                    Title
                  </label>
                    <div className="flex flex-col items-start">
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name="title"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                      </div>
                          <div className="mt-4">
                              <label
                                  htmlFor="password_confirmation"
                                  className="block text-sm font-medium text-white undefined"
                              >
                                Confirm Password
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="password"
                                      name="password_confirmation"
                                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                  />
                              </div>
                          </div>
                          <div className="flex items-center justify-end mt-4">
                              <button
                                  type="submit"
                                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-700 border border-transparent rounded-md active:bg-gray-900 false"
                              >
                                  Create Event
                              </button>
                          </div>
                      </form>
                      <div className="message">{message ? <p>{message}</p> : null}</div>
                  </div>
              </div>
          </div>
    )
}

export default CreateGroup