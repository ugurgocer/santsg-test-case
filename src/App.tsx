import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from '@/route';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ name, path, renderer }) => {
          let element;

          if (renderer.type === 'lazy') {
            const LazyComponent = React.lazy(renderer.component as (() => Promise<{ default: React.ComponentType;}>));
            
            element = (
              <React.Suspense fallback={<div>Loading...</div>}>
                <LazyComponent />
              </React.Suspense>
            )
          } else {
            const RouteComponent = renderer.component as React.ComponentType;

            element = <RouteComponent />;
          }

          return (
            <Route
              key={name}
              path={path}
              element={element}
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
