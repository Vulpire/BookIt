import React, { useEffect, useState } from 'react'

const CreateGroup = () => {
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
    return(
        <div>Hello</div>
    )
}

export default CreateGroup