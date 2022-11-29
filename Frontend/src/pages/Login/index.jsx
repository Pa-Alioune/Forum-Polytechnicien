import {useState} from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/styles/Hooks';
import colors from '../../utils/styles/colors';
import fontStyle from '../../utils/styles/fontStyle';
import logoWhite from '../../assets/LogoForumESPWhite.png';
import backgroundImage from '../../assets/backgroundImage1.jpg';
import googleLogo from '../../assets/logo-google.svg';
import logoDark from '../../assets/LogoForumESPDark1.png';
import axios from 'axios';
import MyLinkButton from '../../components/MyLinkButton';
import BoiteAlerte from '../../components/BoiteAlerte';

const Container = styled.div`
    ${fontStyle.Body}
    background: url(${(props)=>props.imgUrl}); 
    background-size:cover;
    display:flex;
    flex-direction:column;
    height: 100vh;
`;



// const ButtonALert = styled.button`
//     height:40px;
//     padding:0 10px;
//     border:none;
//     border-radius: 10%;
//     background-color:#701c24;
//     color:#f8d7da;
//     &:hover{
//         transition: 0.5s;
//         box-shadow: 0 0 8px #721c24;
//     }
// `;

// const TextAlert = styled.div`
//     display:flex;
//     justify-content:center;
//     position:relative;
//     width:80%;
// `;

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
    height:75vh;
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
    margin: 10px 0;
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

const LoginSetGroup = styled.div`
    display:flex;
    justify-content: space-between;
    width: 90%;
`;


const LabelLoginSet = styled.label`
${fontStyle.Body}
color: ${colors.secondary};
font-size:12px;
text-decoration: none;
`;

const CheckboxGroupStyled = styled.div`
    display: flex;
    align-items: center;
`;

const LinkLoginSet = styled(Link)`
${fontStyle.Body}
color: ${colors.secondary};
font-size:12px;
text-decoration: none;
`;

const LogoGoogle = styled.img`
    width: 30px;
`;


function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [souvenir, setSouvenir] = useState(false);
    const [erreur, setErreur] = useState(true);
    const navigate = useNavigate();
    const {login} = useAuth;


    function handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        poster();
    }

    async function poster(){
        const response = await axios.post('http://#', {
            email: email,
            password:password,
            souvenir: souvenir
        });

        const res = response.data;
        console.log(res);

        login.then(()=>{navigate('/')});
    }

    function onEmailChange(e){
        setEmail(e.target.value);
    }
    function onPasswordChange(e){
        setPassword(e.target.value);
    }
    function onSouvenirChange(e){
        setSouvenir(e.target.checked);
    }

    return(
        <Container imgUrl={backgroundImage}>
           <Header>
                <div><img alt='logo' src={logoWhite} /></div>
                {/* <ButtonALert>OK</ButtonALert> */}
                <BoiteAlerte erreur={erreur} text="Votre mot de passe est incorrecte"/>
                <div>
                    <MyLinkButton type="light" to='/register' label="Inscription"/>
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
                        <div><LabelStyled htmlFor='email'>Votre adresse email</LabelStyled></div>
                        <div><InputStyled onChange={onEmailChange} id='email' type='email' value={email} placeholder='Renseignez votre adresse email ici' required/></div>
                    </InputGroupStyled>
                    <InputGroupStyled>
                        <div><LabelStyled htmlFor='password1' >Votre mot de passe</LabelStyled></div>
                        <div><InputStyled onChange={onPasswordChange} id='password1' type='password' value={password} placeholder='Renseignez votre mot de passe ici' required/></div>
                    </InputGroupStyled>
                    <LoginSetGroup>
                        <CheckboxGroupStyled>
                            <input onChange={onSouvenirChange}  type="checkbox"  id="souvenir" />
                            <LabelLoginSet htmlFor="souvenir">Se souvenir de moi</LabelLoginSet>
                        </CheckboxGroupStyled>
                        <div>
                            <LinkLoginSet to='/'>Mot de passe oublié</LinkLoginSet>
                        </div>
                    </LoginSetGroup>
                    <div><ButtonStyled type='submit'>Connexion</ButtonStyled></div>
                </FormStyled>
                <ButtonStyled2 to='/' ><LogoGoogle src={googleLogo} alt="" /> <div> Continuez avec Google</div></ButtonStyled2>
                <div><Styledparag2 to='/register' >Je ne posséde pas de compte</Styledparag2></div>
           </StyledFormWrapper>
        </Container>
    );
}

export default Login;