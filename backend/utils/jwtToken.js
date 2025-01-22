const sendToken=(user,statusCode,res)=>{
    const token=user.getJwtToken();

    const option={
        expires: new Date(
            Date.now()+90*5215012+8*1000
        ),
        httpOnly: true,
    }

    res.status(statusCode).cookie("token",token, option).json({
        success:true,
        token,
        user
    })

}

module.exports=sendToken;