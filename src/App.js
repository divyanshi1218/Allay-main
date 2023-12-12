import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './components/NotFound'
import HomeScreen from './screen/HomeScreen'
import AddArticleScreen from './screen/AddArticleScreen'
import MyBlogScreen from './screen/MyBlogScreen'
import LoginScreen from './screen/LoginScreen'
// import FillUserDetailsScreen from './screen/FillUserDetailsScreen'
import PostQuestionScreen from './screen/PostQuestionScreen'
import MyUserQuestionsScreen from './screen/MyUserQuestionsScreen'
import QuestionByIdScreen from './screen/QuestionByIdScreen'
import RegisterScreen from './screen/RegisterScreen'
import ProfileScreen from './screen/ProfileScreen'
import PublicPostByIdScreen from './screen/PublicPostByIdScreen'
import PrivatePostByIdScreen from './screen/PrivatePostByIdScreen'
import VolunteerRulesScreen from './screen/VolunteerRulesScreen'
import VolunteerApplyScreen from './screen/VolunteerApplyScreen'
import VolunteerControlScreen from './screen/VolunteerControlScreen'
import VolunteerActiveQuestionsScreen from './screen/VolunteerActiveQuestionsScreen'
import VolunteerPickedQuestionsScreen from './screen/VolunteerPickedQuestionsScreen'
import VolunteerRepliedQuestionsScreen from './screen/VolunteerRepliedQuestionsScreen'
import VolunteerQuestionByIdScreen from './screen/VolunteerQuestionByIdScreen'
import SelectorControlScreen from './screen/SelectorControlScreen'
import SelectorActiveFormsScreen from './screen/SelectorActiveFormsScreen'
import SelectorPickedFormsScreen from './screen/SelectorPickedFormsScreen'
import SelectorFormByIdScreen from './screen/SelectorFormByIdScreen'
import WelcomeScreen from './screen/WelcomeScreen'
// import { fetchCurrentUser } from './actions/userActions'
// import { useDispatch } from 'react-redux'
// import { auth } from './firebase'

function App() {
  // const dispatch = useDispatch()

  // auth.onAuthStateChanged((user) => {
  //   if (user) {
  //     dispatch(fetchCurrentUser())
  //   }
  // })

  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route exact path='/' component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          {/* <Route exact path='/details' component={FillUserDetailsScreen} /> */}
          <Route exact path='/welcome' component={WelcomeScreen} />
          <Route exact path='/home' component={HomeScreen} />
          <Route exact path='/search/public/:searchKeyword' component={HomeScreen} />
          <Route exact path='/sort/public/:sortMood' component={HomeScreen} />
          <Route exact path='/add' component={AddArticleScreen} />
          <Route exact path='/myblogs' component={MyBlogScreen} />
          <Route exact path='/search/myblogs/:searchKeyword' component={MyBlogScreen} />
          <Route exact path='/sort/myblogs/:sortMood' component={MyBlogScreen} />
          <Route exact path='/post' component={PostQuestionScreen} />
          <Route exact path='/myquestions' component={MyUserQuestionsScreen} />
          <Route exact path='/myquestions/:quesId' component={QuestionByIdScreen} />
          <Route exact path='/profile/:userId' component={ProfileScreen} />
          <Route exact path='/edit/profile/:editUserId' component={ProfileScreen} />
          <Route exact path='/edit/blog/:blogId' component={AddArticleScreen} />
          <Route exact path='/public/:blogId' component={PublicPostByIdScreen} />
          <Route exact path='/private/:blogId' component={PrivatePostByIdScreen} />
          <Route exact path='/rules' component={VolunteerRulesScreen} />
          <Route exact path='/apply' component={VolunteerApplyScreen} />
          <Route exact path='/volunteer' component={VolunteerControlScreen} />
          <Route exact path='/volunteer/active' component={VolunteerActiveQuestionsScreen} />
          <Route eaxct path='/volunteer/picked' component={VolunteerPickedQuestionsScreen} />
          <Route exact path='/volunteer/replied' component={VolunteerRepliedQuestionsScreen} />
          <Route exact path='/volunteer/:questionId' component={VolunteerQuestionByIdScreen} />
          <Route exact path='/selector' component={SelectorControlScreen} />
          <Route exact path='/selector/active' component={SelectorActiveFormsScreen} />
          <Route exact path='/selector/picked' component={SelectorPickedFormsScreen} />
          <Route exact path='/selector/:formId' component={SelectorFormByIdScreen} />
          <Route path='/' component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
