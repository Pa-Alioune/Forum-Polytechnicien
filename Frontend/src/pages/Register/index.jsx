import {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../utils/styles/colors';
import fontStyle from '../../utils/styles/fontStyle';
import logoWhite from '../../assets/LogoForumESPWhite.png';
import backgroundImage from '../../assets/backgroundImage1.jpg';
import logoDark from '../../assets/LogoForumESPDark.png';
import GoogleButton from 'react-google-button';



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
const StyledLink = styled(Link)`
    color: ${colors.primary};
    text-decoration: none;
    font-size: 18px;
    border-radius: 30px; 
    background-color: ${colors.colorLight};
    padding: 10px 50px;
    box-shadow: 0 0 10px #494949 ;

    &:hover{
        transition: 0.5s;
        background-color: ${colors.primary};
        color: ${colors.colorLight};
        box-shadow: 0 0 10px #FFFFFF ;
    }
`

const StyledFormWrapper= styled.div`
    width:300px;
    height:85vh;
    background: rgba(255,255,255,0.85);
    border-radius:10px;
    display: flex;
    flex-direction: column;
    align-self:center;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
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
`;

const ButtonStyled2 = styled(Link)`
${fontStyle.Body}
color: ${colors.secondary};
text-decoration: none;
border-radius: 30px; 
background-color: ${colors.colorLight};
border: 1px solid ${colors.primary};
padding: 10px 73px;
margin:20px 0;
`;



function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword2] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        console.log(email);
        console.log(password);
        console.log(name);
        poster();
    }

    async function poster(){
        const response = await axios.post('http://localhost:4000', {
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
        setName(e.target.value);
    }
    function onPassword2Change(e){
        setName(e.target.value);
    }

    return(
        <Container imgUrl={backgroundImage}>
           <Header>
                <div><img alt='logo' src={logoWhite} /></div>
                <div>
                    <StyledLink to='/'>Connexion</StyledLink>
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
                        <div><InputStyled onChange={onNameChange} width="90%" id='name' type='text' placeholder='Renseignez votre nom ici' required/></div>
                    </InputGroupStyled>
                    <InputGroupStyled>
                        <div><LabelStyled htmlFor='email'>Votre adresse email</LabelStyled></div>
                        <div><InputStyled onChange={onEmailChange} id='email' type='email' placeholder='Renseignez votre adresse email ici' required/></div>
                    </InputGroupStyled>
                    <InputGroupStyled>
                        <div><LabelStyled htmlFor='password1' >Votre mot de passe</LabelStyled></div>
                        <div><InputStyled onChange={onPasswordChange} id='password1' type='password' placeholder='Renseignez votre mot de passe ici' required/></div>
                    </InputGroupStyled>
                    <InputGroupStyled>
                        <div><LabelStyled htmlFor='password2' >Confirmer mot de passe</LabelStyled></div>
                        <div><InputStyled onChange={onPassword2Change} id='password2' type='password' placeholder='Confirmez votre mot de passe ici' required/></div>
                    </InputGroupStyled>
                    <div><ButtonStyled type='submit'>Inscription</ButtonStyled></div>
                </FormStyled>
                {/* <div><ButtonStyled2 to='/' >S'incrire avec Google</ButtonStyled2></div> */}
                <div><GoogleButton type='light' label='Se connecter avec Google' /></div>
                <div><Styledparag2 to='/' >Je possede deja un compte</Styledparag2></div>
           </StyledFormWrapper>
        </Container>
    );
}

export default Register;