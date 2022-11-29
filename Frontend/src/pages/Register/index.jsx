import {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../utils/styles/colors';
import fontStyle from '../../utils/styles/fontStyle';
import logoWhite from '../../assets/LogoForumESPWhite.png';
import backgroundImage from '../../assets/backgroundImage1.jpg';
import logoDark from '../../assets/LogoForumESPDark1.png';
import MyLinkButton from '../../components/MyLinkButton';
import googleLogo from '../../assets/logo-google.svg';
import BoiteAlerte from '../../components/BoiteAlerte';




const Container = styled.div`
    ${fontStyle.Body}
    background: url(${(props)=>props.imgUrl}); 
    background-size:cover;
    display:flex;
    flex-direction:column;
    height: 100vh;
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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    
    const [erreur, setErreur] = useState(true);
    const [password1, setPassword1] = useState('');


    function handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        console.log(email);
        console.log(password);
        console.log(name);
        if(password1 === password){
            poster();
        }
        else{
            console.log("Vos mots de passe ne sont pas conformes")
        }
        
    }

    async function poster(){
        const response = await axios.post('http://#', {
            name:name,
            email: email,
            password:password,
        });

        const res = response.data;
        console.log(res);
    }

    function onNameChange(e){
        setName(e.target.value);
    }
    function onEmailChange(e){
        setEmail(e.target.value);
    }
    function onPasswordChange(e){
        setPassword(e.target.value);
    }
    function onPassword2Change(e){
        setPassword1(e.target.value);
    }

    return(
        <Container imgUrl={backgroundImage}>
           <Header>
                <div><img alt='logo' src={logoWhite} /></div>
                <BoiteAlerte erreur={erreur} text="Votre mot de passe est incorrecte"/>
                <div>
                    <MyLinkButton type="light" label="Connexion" to='/' />
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
                        <div><InputStyled onChange={onNameChange} width="90%" id='name' type='text' placeholder='Renseignez votre nom ici' value={name} required/></div>
                    </InputGroupStyled>
                    <InputGroupStyled>
                        <div><LabelStyled htmlFor='email'>Votre adresse email</LabelStyled></div>
                        <div><InputStyled onChange={onEmailChange} id='email' type='email' placeholder='Renseignez votre adresse email ici' value={email}  required/></div>
                    </InputGroupStyled>
                    <InputGroupStyled>
                        <div><LabelStyled htmlFor='password1' >Votre mot de passe</LabelStyled></div>
                        <div><InputStyled onChange={onPasswordChange} id='password1' type='password' placeholder='Renseignez votre mot de passe ici' value={password} required/></div>
                    </InputGroupStyled>
                    <InputGroupStyled>
                        <div><LabelStyled htmlFor='password2' >Confirmer mot de passe</LabelStyled></div>
                        <div><InputStyled onChange={onPassword2Change} id='password2' type='password' placeholder='Confirmez votre mot de passe ici' value={password1} required/></div>
                    </InputGroupStyled>
                    <div><ButtonStyled type='submit'>Inscription</ButtonStyled></div>
                </FormStyled>
                <ButtonStyled2 to='#' ><LogoGoogle src={googleLogo} alt="" /> <div> Continuez avec Google</div></ButtonStyled2>
                <div><Styledparag2 to='/' >Je possede deja un compte</Styledparag2></div>
           </StyledFormWrapper>
        </Container>
    );
}

export default Register;