import React, { useState } from 'react'

function SendEnquiry({ handleQueryPop, saveQuery}) {
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName ] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [queryMessage, setQueryMessage] = useState('');

  const handleSendQuery = (e) => {
    e.preventDefault();
    let queryObj = {};
    queryObj["id"] = Date.now();
    queryObj["firstname"] = firstName;
    queryObj["lastname"] = lastName;
    queryObj["mobile"] = mobileNumber;
    queryObj["email"] = emailId;
    queryObj["queryMessage"] = queryMessage;
    console.log(queryObj)
    saveQuery(queryObj);
  }

  return (
    <div className={`none fixed justify-center h-[26rem]  w-[31rem] top-[52%] left-[56%] translate-x-[-50%] translate-y-[-50%] bg-white p-1 border-1 border-solid border-[#ccc] shadow-md z-[9999] transition-all duration-500 ease-in-out ${handleQueryPop ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
      <div className='flex flex-col justify-evenly text-center'>
        <div className='flex justify-between w-[26rem]'>
          <h3 className='text-black font-mono font-semibold text-[1rem]'> Help</h3>
          <button className='text-center rounded-full text-white font-mono font-semibold bg-red-400 h-5 w-5 text-[1rem]' onClick={handleQueryPop}>X</button>
        </div>

        <form onSubmit={handleSendQuery}>
          <div>
            <div className='flex flex-row justify-evenly w-full'>
              <div className='flex flex-col justify-start'>
                <label htmlFor="fname" className='font-semibold font-mono text-left'>First Name</label>
                <input id='fname' className='w-full text-[13px] font-mono  p-1 border-solid border-[1px] border-black' type="text" placeholder='First Name' 
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)} />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="lname" className='font-semibold font-mono text-left'>Last Name</label>
                <input id='lname' className='w-full text-[13px] font-mono p-1 border-solid border-[1px] border-black' type="text" placeholder='Last Name'
                  value={lastName}
                  onChange={(e) =>{setLastName(e.target.value)}}
                  />
              </div>
            </div>
          </div>

          <div>
            <div className='flex flex-row justify-evenly w-full'>
              <div className='flex flex-col justify-start'>
                <label htmlFor="email" className='font-semibold font-mono text-left'>Email</label>
                <input id='email' className='w-full text-[13px] font-mono  p-1 border-solid border-[1px] border-black' type="text" placeholder='Email' 
                  value={emailId}
                  onChange={(e)=>setEmailId(e.target.value)}
                  />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="Mobile" className='font-semibold font-mono text-left'>Mobile Number</label>
                <input id='Mobile' className='w-full text-[13px] font-mono p-1 border-solid border-[1px] border-black' type="text" placeholder='Mobile Number'
                  value = {mobileNumber}
                  onChange={(e)=>{setMobileNumber(e.target.value)}}
                />
              </div>
            </div>
          </div>

          <div>
            <div className='flex flex-col justify-evenly w-[85%] m-auto'>
              <label
                htmlFor="query"className='font-semibold font-mono text-left'>Ask us</label>

              <textarea
                id='query'
                className='w-full min-h-[10rem] max-h-[10rem] text-[13px] font-mono p-1 border-solid border-[1px] border-black'
                type="text"
                placeholder='Write Your Queries Here......'
                value={queryMessage}
                onChange={(e)=>{setQueryMessage(e.target.value)}}
              />
            </div>
          </div>

          <div>
            <div className='flex gap-3 justify-end mt-3 mr-7'>
              <button className='bg-blue-600 text-white font-semibold w-[3rem] p-[0.1rem] rounded font-mono'> Send </button>
              <button className='bg-blue-600 text-white font-semibold w-[4rem] p-[0.1rem] rounded font-mono'> Cancel </button>
            </div>
          </div>
        </form>
      </div>


    </div>
  )
}

export default SendEnquiry