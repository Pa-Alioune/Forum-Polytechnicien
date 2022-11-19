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
    box-shadow: 0 0 10px #585858 ;

    &:hover{
        transition: 0.5s;
        background-color: ${colors.primary};
        color: ${colors.colorLight};
        box-shadow: 0 0 8px ${colors.primary}
    }
`

const StyledFormWrapper= styled.div`
    width:300px;
    height:70vh;
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
width:100%;
text-decoration: none;
border-radius: 30px; 
background-color: ${colors.colorLight};
border: 1px solid ${colors.primary};
padding: 10px 95px;
margin:20px 0;
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



function Login(){
    return(
        <Container imgUrl={backgroundImage}>
           <Header>
                <div><img alt='logo' src={logoWhite} /></div>
                <div>
                    <StyledLink to='/register'>Inscription</StyledLink>
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
                <FormStyled>
                    <InputGroupStyled>
                        <div><LabelStyled htmlFor='email'>Votre adresse email</LabelStyled></div>
                        <div><InputStyled id='email' type='email' placeholder='Renseignez votre adresse email ici' required/></div>
                    </InputGroupStyled>
                    <InputGroupStyled>
                        <div><LabelStyled htmlFor='password1' >Votre mot de passe</LabelStyled></div>
                        <div><InputStyled id='password1' type='password' placeholder='Renseignez votre mot de passe ici' required/></div>
                    </InputGroupStyled>
                    <LoginSetGroup>
                        <CheckboxGroupStyled>
                            <input type="checkbox"  id="souvenir" />
                            <LabelLoginSet htmlFor="souvenir">Se souvenir de moi</LabelLoginSet>
                        </CheckboxGroupStyled>
                        <div>
                            <LinkLoginSet to='/'>Mot de passe oublié</LinkLoginSet>
                        </div>
                    </LoginSetGroup>
                    <div><ButtonStyled type='submit'>Connexion</ButtonStyled></div>
                </FormStyled>
                {/* <div><ButtonStyled2 to='/' >Button Google</ButtonStyled2></div> */}
                <div><GoogleButton type='light' label='Se connecter avec Google' /></div>
                <div><Styledparag2 to='/register' >Je ne posséde pas de compte</Styledparag2></div>
           </StyledFormWrapper>
        </Container>
    );
}

export default Login;