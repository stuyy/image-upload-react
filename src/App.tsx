import { Switch, Route } from 'react-router-dom';
import { ImageResultPage } from './pages/ImageResultPage';
import { ImageUploadPage } from './pages/ImageUploadPage';

function App() {
  return (
    <Switch>
      <Route exact={true} path="/" component={ImageUploadPage} />
      <Route exact={true} path="/img/:key" component={ImageResultPage} />
    </Switch>
  );
}

export default App;
