import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { Suspense, lazy } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import BasePage from "../components/layout/BasePage";
import PageLoader from "../components/common/PageLoader";
import logger from "sabio-debug";
import { getCurrent } from "../services/userService";
import privateRoutes from "./privateRoutes";
import { publicRoutes, listOfPages } from "./publicRoutes";
import Loading from "../components/loading/Loading";

const _logger = logger.extend("AppRoutes");
const Base = lazy(() => import("../components/layout/Base"));
const Error404 = lazy(() => import("../components/public/Error404"));

// import BaseHorizontal from './components/Layout/BaseHorizontal';

/* Used to render a lazy component with react-router */
//const waitFor = Tag => props => <Tag {...props} />;

//const waitFor = Tag => props => <Tag {...props} />;

// const waitFor = function(Tag) {
//   return function Wrapper(props) {
//     return <Tag {...props} />;
//   };
// };

/*

Route pattern to Use for First cards:

Routes to use if you were going to create CRUD views for "ticket" entities

- /tickets
  -  View a list of tickets

- /tickets/:id/edit
  - View a specific ticket and the details for that ticket in a form for editing
  - Example for ticket with Id of 12: /tickets/12/edit

- /tickets/:id
  - View a specific ticket and the details for that ticket in a READ ONLY mode
  - Example for ticket with Id of 12: /tickets/12


- /tickets/new
  - View where a form will be displayed so that a new ticket can be added

Beyond Simply CRUD

- /tickets?q=searchterm
  - View a list of tickets that match the search terms passed in the "q" query string paramenter
  - This will route to the same compoenent as `/tickets` so some condition logic will have to be written to handle both use cases

- /tickets/category/:categoryId
  - View a list of tickets that a category of the specified categoryId

See here for how to pass params in route: 

http://sabiocode.cloudapp.net:8080/tfs/SabioCollection/Content-JavaScript/_wiki/wikis/Content-JavaScript.wiki?pagePath=%2FJavascript%20Home%2FReact%20Home%2FReact%20Router%2FReact%20Router%20Params&wikiVersion=GBwikiMaster

*/

class AppRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.currentKey = props.location.pathname.split("/")[1] || "/";
    this.timeout = { enter: 500, exit: 500 };

    // Animations supported
    //      'rag-fadeIn'
    //      'rag-fadeInRight'
    //      'rag-fadeInLeft'
    this.animationName = "rag-fadeIn";

    this.state = {
      currentUser: {
        roles: [],
        name: "",
        email: "",
        isLoggedIn: false
      },
      availableRoutes: [],
      isLoading: true
    };
  }

  componentDidMount() {
    if (!this.state.currentUser.isLoggedIn) {
      getCurrent()
        .then(result => this.getCurrentSuccess(result))
        .catch(this.getCurrentError);
    }
  }

  getCurrentSuccess = response => {
    const currentUser = response.item;
    this.setState({
      currentUser: { ...currentUser, isLoggedIn: true },
      availableRoutes: this.filteredRoutes(currentUser.roles),
      isLoading: false
    });
  };

  getCurrentError = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isLoading: false
      };
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    _logger(nextProps, prevState);
    const type = nextProps.location.state ? nextProps.location.state.type : "";
    switch (type) {
      case "login":
        return nextProps.location.state.currentUser.id !==
          prevState.currentUser.id
          ? {
              currentUser: {
                ...nextProps.location.state.currentUser,
                email: nextProps.location.state.currentUser.name,
                isLoggedIn: true
              },
              availableRoutes: privateRoutes.filter(route => {
                return route.roles.some(role =>
                  role.includes(nextProps.location.state.currentUser.roles)
                );
              }),
              isLoading: false
            }
          : {};
      case "logout":
        return {
          currentUser: {
            ...nextProps.location.state.currentUser
          },
          availableRoutes: [],
          isLoading: false
        };
      default:
        return prevState.currentUser.isLoggedIn
          ? {
              currentUser: {
                ...prevState.currentUser
              },
              availableRoutes: privateRoutes.filter(route => {
                return route.roles.some(role =>
                  role.includes(prevState.currentUser.roles)
                );
              }),
              isLoading: false
            }
          : {};
    }
  }

  filteredRoutes = roles => {
    if (this.state.currentUser.isLoggedIn) {
      return privateRoutes.filter(route => {
        return route.roles.some(role => role.includes(roles));
      });
    }
  };

  mapRoute = routeData => {
    let Component = routeData.component;
    return (
      <Route
        key={routeData.path}
        path={routeData.path}
        exact={routeData.exact}
        render={props => (
          <Component {...props} currentUser={this.state.currentUser} />
        )}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      let content = null;
      const path = this.props.location.pathname.split("/")[1] || "/";
      if (!listOfPages.includes(path) && this.state.currentUser.isLoggedIn) {
        content = this.getLayoutContent();
      } else {
        _logger(publicRoutes.map(item => item.path));
        content = this.getSimplePageContent();
      }

      return content;
    }
  }

  getLayoutContent = () => {
    // Layout component wrapper
    // Use <BaseHorizontal> to change layout
    return (
      <Suspense fallback={<PageLoader />}>
        <Base currentUser={this.state.currentUser}>
          <TransitionGroup>
            <CSSTransition
              key={this.currentKey}
              timeout={this.timeout}
              classNames={this.animationName}
              exit={false}
            >
              <React.Fragment>
                <Suspense fallback={<PageLoader />}>
                  <Switch location={this.props.location}>
                    {this.state.availableRoutes.map(this.mapRoute)}
                    {publicRoutes.map(this.mapRoute)}
                    <Route
                      render={props => (
                        <Error404
                          {...props}
                          currentUser={this.state.currentUser}
                        />
                      )}
                    />
                  </Switch>
                </Suspense>
              </React.Fragment>
            </CSSTransition>
          </TransitionGroup>
        </Base>
      </Suspense>
    );
  };

  getSimplePageContent = () => {
    return (
      // Page Layout component wrapper
      <BasePage
        currentUser={this.state.currentUser}
        history={this.props.history}
      >
        <Suspense fallback={<PageLoader />}>
          <Switch location={this.props.location}>
            {publicRoutes.map(this.mapRoute)}
            <Route render={props => <Error404 {...props} />} />
          </Switch>
        </Suspense>
      </BasePage>
    );
  };
}

AppRoutes.propTypes = {
  currentUser: PropTypes.shape({
    roles: PropTypes.array,
    userName: PropTypes.string,
    email: PropTypes.string
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    state: PropTypes.object
  })
};

export default withRouter(AppRoutes);
