import { useState, useEffect,useRef,} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import colors from '../../utils/styles/colors';
import fontStyle from '../../utils/styles/fontStyle';
import logoWhite from '../../assets/LogoForumESPWhite.png';
import backgroundImage from '../../assets/backgroundImage1.jpg';
import logoDark from '../../assets/LogoForumESPDark1.png';
import MyLinkButton from '../../components/MyLinkButton';
import googleLogo from '../../assets/logo-google.svg';
import BoiteAlerte from '../../components/BoiteAlerte';
import { FaCheck, FaTimes,FaInfoCircle } from 'react-icons/fa';
import { useAuth } from '../../utils/styles/UseAuth';
import { NewUserContext } from '../../utils/styles/Contexte';
import { useContext } from 'react';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[A-z][A-z0-9-_]{3,23}@esp\.sn$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/;
const URL_REGISTER = 'http://127.0.0.1:8000/api/user/';


const Iudnote = styled.p`
    display: ${({focus, user, notValidName})=> (focus && user && notValidName) ? 'block' : 'none' }
`;

const Emailnote = styled.p`
    display: ${({focus, email, notValidEmail})=> (focus && email && notValidEmail) ? 'block' : 'none' }
`;

const Pwdnote = styled.p`
    display: ${({focus, pwd, notValidPwd})=> (focus && pwd && notValidPwd) ? 'block' : 'none' }
`;

const Confirmenote = styled.p`
    display: ${({focus, notValidMatch})=> (focus && notValidMatch) ? 'block' : 'none' }
`;


const Container = styled.div`
    ${fontStyle.Body}
    background: url(${(props)=>props.imgUrl}); 
    background-size:cover;
    background-attachement: scroll;
    display:flex;
    flex-direction:column;
    height: 120vh;
`;


const Header = styled.div`
    height: 2.5em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2em 3em;
    background-attachment: fixed;

`


const StyledFormWrapper= styled.div`
    width:300px;
    height:90vh;
    background: rgba(255,255,255,0.85);
    border-radius:10px;
    display: flex;
    flex-direction: column;
    align-self:center;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px;
    position: relative;
    top: -1.5em;
    box-shadow: 0 0 10px #494949 ;

`
const LogoStyle = styled.img`
    max-width: 60px;
`;

const Styledparag = styled.p`
    ${fontStyle.Body};
    font-size:12px;
`;

const Styledparag2 = styled(Link)`
    ${fontStyle.Body};
    color: ${colors.primary};
    font-size:12px;
    text-decoration:none;    
`;


const FormStyled = styled.form`
    width:100%;
    display:flex;
    flex-direction: column;
    align-items:center;
`;

const InputGroupStyled = styled.div`
    width:90%;
    margin: 5px 0;
`;


const LabelStyled = styled.label`
    ${fontStyle.BodyHighLight};
    color: ${colors.primary};
`;

const InputStyled = styled.input`
    outline : none;
    background:none;
    height:30px;
    width: 100%;
    border: none;
    border-bottom: 1px solid ${colors.primary}
`;
const ButtonStyled2 = styled(Link)`
${fontStyle.Body}
color: ${colors.secondary};
width:80%;
text-decoration: none;
border-radius: 30px; 
background-color: ${colors.colorLight};
border: 1px solid ${colors.secondary};
padding: 3px 23px;
margin:0px 0;
display:flex;
align-items:center;
justify-content:center;
gap:10px;
&:hover{
        transition: 0.5s;
        box-shadow: 0 0 8px ${colors.primary}
    }
`;

const ButtonStyled = styled.button`
${fontStyle.Body}
color: ${colors.colorLight};
width:100%;
text-decoration: none;
border-radius: 30px; 
background-color: ${colors.primary};
padding: 10px 110px;
border:none;
margin:20px 0;
margin-top: 30px;
&:hover{
        transition: 0.5s;
        box-shadow: 0 0 8px ${colors.primary}
    }
`;

const LogoGoogle = styled.img`
    width: 30px;
`;


function Register(){
    const userRef = useRef();
    const {auth,setAuth} = useAuth();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    
    
    const [erreur, setErreur] = useState('');

    const navigate = useNavigate();
    const {newUser, setNewUser} = useContext(NewUserContext);

    useEffect(()=>{
        userRef.current.focus();
    },[]);

    useEffect(()=>{
        setValidName(USER_REGEX.test(name));
    },[name]);

    useEffect(()=>{
        setValidEmail(EMAIL_REGEX.test(email));
    },[email]);

    useEffect(()=>{
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(matchPwd === password);
    },[password, matchPwd]);

    useEffect(()=>{
        setErreur('');
    },[name, email, password, matchPwd]);


    const handleSubmit = async (e)=>{
        e.preventDefault();
        const v1 = USER_REGEX.test(name);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(password);

        if(!v1 || !v2 || !v3){
            setErreur('Invalid Entry');
            return;
        }
        try{
            const response = await axios.post(URL_REGISTER,
                {
                    email:email,
                    name:name,
                    password:password,
                } 
            );
            console.log(response.data);
            setNewUser(response.data);
            console.log(newUser);

            try{
                const response = await axios.post('http://127.0.0.1:8000/api/token', 
                {
                    email: email,
                    password:password,
                });
                const res = response.data;
                const accessToken = res?.access;
                const refreshToken = res?.refresh;
                console.log(accessToken)
                
                setAuth({user : {accessToken,refreshToken}});
                console.log(auth.user.accessToken);
            }
            catch(err){
                if(!err?.response){
                    setErreur('No server response');
                }else if (err.response?.status === 400) {
                    if(err.response.data.password)
                    setErreur(err.response.data.password);
                    else if(err.response.data?.email)
                    setErreur(err.response.data.email);
                } else if (err.response?.status === 401) {
                    setErreur(err.response.data.detail);
                } else {
                    setErreur('Login Failed');
                }
            }
            
            setName('');
            setPassword('');
            setMatchPwd('');
            navigate('/center');
        }catch(err){
            if(!err?.response){
                setErreur('No Server response');
            }
            else if(err.response?.status === 409){
                setErreur('Username Taken');
            }
            else if(err.response?.status === 400){
                setErreur('Cet utilisateur existe dèja.');
            }
            else{
                setErreur('Registration failed');
            }
        };
        
        
    }

    return(
        <Container imgUrl={backgroundImage}>
           <Header>
                <div><img alt='logo' src={logoWhite} /></div>
                <BoiteAlerte erreur={erreur} />
                <div>
                    <MyLinkButton type="light" label="Connexion" to='/login' />
                </div>
           </Header>
           <StyledFormWrapper>
                <div>
                    <LogoStyle src={logoDark} />
                </div>
                <div>
                    <Styledparag>
                        Un lieu pour partager le savoir et mieux comprendre le monde
                    </Styledparag>
                </div>
                <FormStyled onSubmit={handleSubmit}>
                    <InputGroupStyled>
                        <div><LabelStyled  htmlFor='name'>Votre Nom</LabelStyled></div>
                        <div><InputStyled 
                                onChange={(e)=>setName(e.target.value)} 
                                width="90%" 
                                id='name' 
                                type='text' 
                                placeholder='Renseignez votre nom ici' 
                                value={name}
                                ref={userRef} 
                                aria-invalid={validName ? "true" : "false"}
                                aria-describedby="uidnote"                      
                                onFocus={()=>setUserFocus(true)}
                                onBlur={()=> setUserFocus(false)}
                                required
                            />
                        </div>
                        <Iudnote id="iudnote" focus={userFocus} user={name} notValidName={!validName} >
                            <FaInfoCircle />
                            4 à 24 caractères.<br />
                            Commence par une lettre.<br />
                            Lettres, nombres, underscores.
                        </Iudnote>
                    </InputGroupStyled>
                    
                    <InputGroupStyled>
                        <div><LabelStyled htmlFor='email'>Votre adresse email</LabelStyled></div>
                        <div><InputStyled 
                                onChange={(e)=>setEmail(e.target.value)} 
                                id='email' 
                                type='email' 
                                placeholder='Renseignez votre adresse email ici' 
                                value={email}  
                                aria-invalid={validEmail ? "true" : "false"}
                                aria-describedby="emailnote"                      
                                onFocus={()=>setEmailFocus(true)}
                                onBlur={()=> setEmailFocus(false)}
                                required
                              />
                        </div>
                        <Emailnote id="emailnote" focus={emailFocus} email={email} notValidEmail={!validEmail} >
                            <FaInfoCircle />
                            4 à 24 caractères.<br />
                            Commence par une lettre.<br />
                            Lettres, nombres, underscores.
                        </Emailnote>
                    </InputGroupStyled>
                    <InputGroupStyled>
                        <div><LabelStyled htmlFor='password' >Votre mot de passe :  
                                {validPwd && password && <FaCheck />}
                                {!validPwd && password && <FaTimes />}</LabelStyled></div>
                        <div><InputStyled 
                                onChange={(e)=>setPassword(e.target.value)} 
                                id='password' type='password' 
                                placeholder='Renseignez votre mot de passe ici' 
                                value={password} 
                                aria-invalid={validPwd ? "true" : "false"}
                                aria-describedby="pwdnote"
                                onFocus={()=>setPwdFocus(true)}
                                onBlur={()=> setPwdFocus(false)}
                                required
                            />
                        </div>
                        <Pwdnote id='pwdnote' pwd={password} focus={pwdFocus} notValidPwd={!validPwd}  >
                            <FaInfoCircle />
                            8 à 24 caractères.<br />
                            Doit contenir une lette majuscule, une lettre miniscule et un chiffre.<br />
                        </Pwdnote>
                    </InputGroupStyled>
                    <InputGroupStyled>
                        <div>
                            <LabelStyled htmlFor='matchPwd' >Confirmer mot de passe : 
                                {validMatch && matchPwd && <FaCheck />}
                                {!validMatch && matchPwd && <FaTimes />}
                            </LabelStyled>
                        </div>
                        <div><InputStyled 
                                onChange={(e)=>setMatchPwd(e.target.value)} 
                                id='matchPwd' 
                                type='password' 
                                placeholder='Confirmez votre mot de passe ici' 
                                value={matchPwd} 
                                aria-invalid={validMatch ? "true" : "false"}
                                aria-describedby="confirmenote"
                                onFocus={()=>setMatchFocus(true)}
                                onBlur={()=> setMatchFocus(false)}
                                required
                            />
                        </div>
                        <Confirmenote id='confirmenote' focus={matchFocus} notValidMatch={!validMatch}  >
                            <FaInfoCircle />
                            Doit contenir le mot de passe ci-dessus.
                        </Confirmenote>
                    </InputGroupStyled>
                    <div><ButtonStyled disabled={!validName || !validPwd || !validMatch ? true : false} type='submit'>Inscription</ButtonStyled></div>
                </FormStyled>
                <ButtonStyled2 to='#' ><LogoGoogle src={googleLogo} alt="" /> <div> Continuez avec Google</div></ButtonStyled2>
                <div><Styledparag2 to='/' >Je possede deja un compte</Styledparag2></div>
           </StyledFormWrapper>
        </Container>
    );
}

export default Register;