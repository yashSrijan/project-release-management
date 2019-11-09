import React from 'react';
import FilterContainer from './filter/FilterContainer';
import ReleasesContainer from './releases/ReleasesContainer';

const App = () => (
    <div id = 'app-component' className = 'container'>
        <FilterContainer/>
        <ReleasesContainer/>
    </div>
)
        
export default App;
