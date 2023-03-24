import axios from "axios";
import { useRef, useEffect, useCallback, useState, useContext } from "react";
import { ModalHobbie } from "./ModalHobbie";
import colors from "../utils/styles/colors";
import styled from "styled-components";
import fontStyle from "../utils/styles/fontStyle";
import { MdClose } from "react-icons/md";
import {
  SelectionContext,
  AuthContext,
  ConnectedUser,
} from "../utils/styles/Contexte";
import userPhoto1 from "../assets/user1.png";
import { useDropzone } from "react-dropzone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1040;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const Container = styled.div`
  position: fixed;
  top: 100px;
  left: 30%;
  width: auto;
  z-index: 1050;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-radius: 10px;
  background: blue;
`;

const StyledModal = styled.div`
  z-index: 100;
  background: #fff;
  position: relative;
  margin: 0;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  padding: 1rem;
  height: 100%;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.div``;

const Foot = styled.div``;
const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const StyledMdClose = styled(MdClose)`
  font-size: 1.4rem;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  border: none;
  background: #dddddd;
  padding: 4px;
  border-radius: 50%;
`;
const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`;

const UserName = styled.h1`
  ${fontStyle.BodyHighLight};
  margin: 0;
`;

const Visibilite = styled.button`
  ${fontStyle.Body};
  color: ${colors.backgroundDark};
  font-size: 12px;
`;
const WrapperProfile = styled.div`
  display: flex;
  flex-direction: column;
  justifiy-content: center;
  align-items: flex-start;
`;

const Text = styled.div`
  max-height: 150px;
  overflow: scroll;
`;

// const InputText = styled.textarea`
//   outline: none;
//   border: none;
//   position: relative;
//   left: 0;
//   width: 480px;
// `;

const InputGrafikart = styled.div`
  height: 100px;
  overflow: scroll;
`;

const ButtonStyled = styled.button`
  ${fontStyle.Body}
  color:  ${({ text }) => (text ? colors.colorLight : colors.colorDark)};
  width: 100%;
  text-decoration: none;
  border-radius: 5px;
  background-color: ${({ text }) => (text ? colors.primary : "#DDDDDD")};
  cursor: ${({ text }) => (text ? "pointer" : " not-allowed")};
  padding: 10px 110px;
  border: none;
  margin: 10px 0;
  margin-top: 10px;
  &:hover {
    transition: 0.5s;
    box-shadow: ${({ text }) => (text ? `0 0 2px ${colors.primary}` : "none")};
  }
`;
const ButtonStyledCenter = styled.button`
  ${fontStyle.Body}
  color:  ${({ text }) => (text ? colors.colorLight : colors.colorDark)};
  width: 100%;
  text-decoration: none;
  border-radius: 5px;
  background-color: #dddddd;
  cursor: pointer;
  padding: 10px 110px;
  border: none;
  margin: 20px 0;
  margin-top: 30px;
  &:hover {
    transition: 0.5s;
    box-shadow: 0 0 2px ${colors.primary};
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PreviewCard = styled.div`
  position: relative;
  width: 100px;
  margin: 10px;
  text-align: center;
  overflow: hidden;
`;

const PreviewImg = styled.img`
  height: 80px;
  width: 80px;
  object-fit: cover;
`;
const DropzoneContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
`;
const PreviewName = styled.p`
  font-size: 0.8em;
  margin: 5px;
`;

const DeleteBtn = styled.button`
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 0.8em;
`;

function PostNew({
  onCloselayClick,
  onOverlayClick,
  onHobbieClick,
  myQuestion = null,
}) {
  // const textRef = useRef();
  const [text, setText] = useState("");
  const [validText, setValidText] = useState(false);
  const user = useContext(ConnectedUser);
  const [hobbie, setHobbie] = useState(false);
  const { selections, viderSelection } = useContext(SelectionContext);
  const [selectHobbies, setSelectHobbies] = useState([]);

  // useEffect(() => {
  //   textRef.current.focus();
  // }, []);

  useEffect(() => {
    setValidText(text ? true : false);
  }, [validText, text]);
  const handleHobbieSubmit = () => {
    setHobbie(false);
    selections.map((newSelection) => {
      setSelectHobbies([...selectHobbies, newSelection.id]);
    });
  };

  const [files, setFiles] = useState([]);
  const { auth } = useContext(AuthContext);

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (!files.find((f) => f.name === file.name)) {
        setFiles((prevFiles) => [
          ...prevFiles,
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ]);
      }
    });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const deleteFile = (deletedFile) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== deletedFile));
  };

  //   const navigate = useNavigate();
  const handlePostSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("contents", text);
    if (myQuestion !== null) {
      myQuestion.hobbies.forEach((id) => {
        formData.append("hobbies", id);
      });
      formData.append("question", myQuestion.id);
    } else {
      selections.forEach((element) => {
        formData.append("hobbies", element.id);
      });
    }
    files.forEach((file) => {
      formData.append("images", file);
    });
    console.log(formData);
    axios
      .post("http://localhost:8000/api/publications/", formData, {
        headers: {
          Authorization: `Bearer ${auth.user.accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          onCloselayClick();
          setHobbie(false);
          viderSelection();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return hobbie ? (
    <ModalHobbie
      onOverlayClick={() => {
        setHobbie(false);
      }}
      onCloselayClick={() => {
        setHobbie(false);
      }}
      onHobbieSubmit={handleHobbieSubmit}
    />
  ) : (
    <div>
      <Overlay onClick={onOverlayClick}></Overlay>
      <Container>
        <StyledModal>
          <Head>
            <div>
              <Profile>
                <div>
                  <UserImg
                    src={`http://localhost:8000${user.profile_photo}`}
                    alt="user"
                  />
                </div>
                <WrapperProfile>
                  <UserName>{user.name}</UserName>
                  <Visibilite>Public</Visibilite>
                </WrapperProfile>
              </Profile>
            </div>
            <div>
              <StyledMdClose onClick={onCloselayClick} />
            </div>
          </Head>
          <form onSubmit={handlePostSubmit}>
            <Body>
              <Text>
                <CKEditor
                  editor={ClassicEditor}
                  data={text}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setText(data);
                  }}
                />
              </Text>
              <InputGrafikart>
                <DropzoneContainer {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Déposez l'image Ici ...</p>
                  ) : (
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  )}
                  <PreviewContainer>
                    {files.map((file) => (
                      <PreviewCard key={file.name}>
                        <DeleteBtn
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFile(file);
                          }}
                        >
                          X
                        </DeleteBtn>
                        <PreviewImg src={file.preview} alt={file.name} />
                        <PreviewName>{file.name}</PreviewName>
                      </PreviewCard>
                    ))}
                  </PreviewContainer>
                </DropzoneContainer>
              </InputGrafikart>
            </Body>
            <Foot>
              {myQuestion === null ? (
                <ButtonStyledCenter
                  onClick={() => {
                    setHobbie(true);
                  }}
                >
                  Ajouter vos centres d'intérêts
                </ButtonStyledCenter>
              ) : (
                ""
              )}

              <ButtonStyled
                type="submit"
                text={validText}
                disabled={!text ? true : false}
                //   onClick={onCloselayClick}
              >
                Publier
              </ButtonStyled>
            </Foot>
          </form>
        </StyledModal>
      </Container>
    </div>
  );
}
export default PostNew;
