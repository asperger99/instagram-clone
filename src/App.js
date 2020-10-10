import React, { useState, useEffect } from 'react';
import './App.css';
import Post from "./Post"
import { db, auth } from "./firebase"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from "./ImageUpload"
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false)

  useEffect(() => {
    db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser)
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
    return () => {
      //if useEffect fires again perfoem some cleanup action before refiring cleanup action
      //that is prevent duplication of listener
      unsubscribe()
    }

  }, [user])

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        })
      })
      .catch((error) => alert(error.message))
    setOpen(false)
  }


  const signIn = (event) => {
    event.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    setOpenSignIn(false)
  }

  return (
    <div className="app">


      <Modal
        open={open}
        onClose={() => setOpen(false)}

      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">


            <center>
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
                className="app__headerImage" />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>


          </form>
        </div>
      </Modal>




      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}

      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">


            <center>
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
                className="app__headerImage" />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>


          </form>
        </div>
      </Modal>


      <div className="app__header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerImage" />
        {
          user ? (<Button varient="contained" onClick={() => auth.signOut()}>LogOut</Button>) :
            (<div>
              <Button varient="contained" onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button varient="contained" onClick={() => setOpen(true)}>Sign Up</Button>
            </div>)
        }
      </div>

      {/* <Button varient="contained" onClick={() => setOpen(true)}>sign Up</Button> */}
      <div className="app__post">

        <div className="app__postLeft">
          {
            posts.map(({ id, post }) => {
              return <Post
                key={id}
                postId={id}
                user={user?.displayName}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}

              />
            })
          }
        </div>
        <div className="app__postRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/CAlD9nDF8Yd/"
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
          <InstagramEmbed
            url="https://www.instagram.com/p/BlGSqCPA8GH/"
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
          <InstagramEmbed
            url="https://www.instagram.com/p/B88VHbqpE02/"
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
          <InstagramEmbed
            url="https://www.instagram.com/p/BlVHEveD1aK2juDq6cAQlkr8NUJsuuASetonuo0/"
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
          <InstagramEmbed
            url="https://www.instagram.com/p/ByqYTrHpInd/"
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
          <InstagramEmbed
            url="https://www.instagram.com/p/B_VGw-CJj_2/"
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
        </div>

      </div>



      {user?.displayName ? (<ImageUpload username={user.displayName} />) :
        (<h3 style={{textAlign:"center",padding:"50px 0"}}>Please sign in to Upload</h3>)}
    </div>
  );
}

export default App;
