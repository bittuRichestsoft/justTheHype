import {NavigationActions} from 'react-navigation';
let _navigatorHome;

function setHomeNavigator(navigatOrRef) {
    _navigatorHome = navigatOrRef
  }

  function navigate(routeName, params ) {
    _navigatorHome.dispatch( NavigationActions.navigate({ type: 'Navigation/NAVIGATE', routeName, params})
    );
  }

  export default {
    navigate,
    setHomeNavigator,
  };