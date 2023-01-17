import styled from "styled-components";
import logoDark from "../../assets/LogoForumESPDark.png";
import colors from "../../utils/styles/colors";
import fontStyle from "../../utils/styles/fontStyle";
import ButtonStyled from "../../components/ButtonStyled";
import GroupDomain from "../../components/GroupDomain";
import { SelectionContext, AuthContext, NewUserContext} from "../../utils/styles/Contexte";
import {MAX_HOBBIES} from '../../components/VariableGlobal'
import { useContext } from "react";
import {useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


const Container = styled.div`
    display: flex;
    flex-direction:column;
    align-items:center;
    box-sizing:border-box;
`;

const Header = styled.div`
    height: 2.5em;
    width:100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 0;
    background-attachment: fixed;
    box-shadow: 0 0 8px rgba(150, 150, 150, 0.8);
    margin-bottom: 15px;
    background-color:${colors.backgroundLight};

`;
const StyledLogo = styled.img`
    margin: 0 3em;
`;

const Wrapper = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    width:70%;
    height: 67vh;
    border-radius:20px;
    border : 1px solid ${colors.primary};
    margin-bottom:20px;
    
`;

const WrapperHeader = styled.div`
    ${fontStyle.Title1}
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    height:50px;
    position: fixed;
    width:70%;
    background:fixed;
    border-radius:20px 20px 0px 0px;
    background-color:${colors.primary};
    color:${colors.colorLight};
    
`;

const GroupContainer = styled.div`
    overflow-y:scroll;
    height: 90%;
    margin-top: 50px;
    width:100%;
    background-color:rgba(150, 150, 150, 0.2);
    `;


const Parag = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
    background-attachement:fixed;
    background-color:rgba(150, 150, 150, 0.2);
    border-radius:0 0 20px 20px;
    color: ${colors.primary};
`;


function CentreInteret(){
    const [data, setData] = useState([]);
    const {auth} = useContext(AuthContext);
    const {selections, viderSelection} = useContext(SelectionContext);
    const {newUser,setNewUser} = useContext(NewUserContext);

    const navigate = useNavigate();
    let Domains=[];


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/hobbie/', {
          headers: { Authorization: `Bearer ${auth.user.accessToken}`},
        })
          .then((res) => setData(res.data.results))
          .catch((error) => console.log(error));
      }, [auth.user.accessToken]);

      viderSelection();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.patch(`http://127.0.0.1:8000/api/user/${newUser.id}/`, 
            {
                hobbies: selections,
                headers: { Authorization: `Bearer ${auth.user.accessToken}`}
            });
            const res = response.data;
            setNewUser(res);
            navigate("/")
        }
        catch(err){
            if(!err?.response){
                console.log('No server response');
            }else if (err.response?.status === 400) {
                if(err.response.data.password)
                console.log(err.response.data.password);
                else if(err.response.data?.email)
                console.log(err.response.data.email);
            } else if (err.response?.status === 401) {
                console.log(err.response.data.detail);
            } else {
                console.log('Failed');
            }
        }
    }

    const listDomainFormat = function(category){
        for(let j=0; j<=Domains.length; j++){
            if(category === Domains[j]){
                return;
            }
        }
        Domains = [...Domains,category];
        return category;
    }
    
    console.log(selections);
    console.log()

    return(
            <Container >
                <Header>
                    <div><StyledLogo alt='logo' src={logoDark} /></div>
            </Header>
            <Wrapper>
                    <WrapperHeader><h1>Quels sont vos centres d'intérêts</h1></WrapperHeader>
                    <GroupContainer>
                        {
                        ( data.map((domain)=>(listDomainFormat(domain.category_hobbie))) &&
                            Domains.map((domain,index)=>(<GroupDomain key={`${index}cle`} domain={domain} data={data}/>)))
                        }
                    </GroupContainer>
                    <Parag>
                        <p>{selections.length} sur {MAX_HOBBIES} choix</p>
                    </Parag>
            </Wrapper>
            <div><ButtonStyled onClick={handleSubmit} label={'Terminer mon inscription'}></ButtonStyled></div>
            </Container>
    )
}

export default CentreInteret;