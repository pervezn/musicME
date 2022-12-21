import {getProviders, signIn } from 'next-auth/react'

function Login({ providers }) {
    // console.log('%%%%%' + providers)
    return (
        <div>
            <img src="https://links.papareact.com/9xl"  style={{height:'70px'}}/>
            <div>
            {Object.values(providers).map((provider, key) => <button key={key} 
                                                                        style={{color:'white', height: '70px'}} 
                                                                        onClick={() => signIn(provider.id, {callbackUrl:'/'})}>
                                                                            Login with {provider.name}</button>)}
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