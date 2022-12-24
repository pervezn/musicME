import {getProviders, signIn } from 'next-auth/react'

function Login({ providers }) {
    // console.log('%%%%%' + providers)
    return (
        <div className='bg-black flex flex-col items-center min-h-screen w-full justify-center'>
            <h1 className='text-white text-3xl mb-10'>MusicMe</h1>
            <img src="https://links.papareact.com/9xl" className='w-52 mb-5'/>
            <div>
            {Object.values(providers).map((provider, key) => 
                <button key={key} onClick={() => signIn(provider.id, {callbackUrl:'/'})} className='bg-[#18D860] text-white p-5 rounded-full'>
                    Login with {provider.name}
                </button>)}
            </div>
        </div>
    )
}

export default Login

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    }
}