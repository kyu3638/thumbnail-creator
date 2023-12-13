import React from 'react';
import '../App.scss';
import { connect } from 'react-redux';
import ThumbCreator from './ThumbCreator';
import ThumbStorage from './ThumbStorage';

function AppContainer(props) {
  return (
    <div
      style={{
        background: props.background,
        backgroundPosition: `center`,
        backgroundSize: `cover`,
      }}
      className="App"
    >
      <ThumbCreator />
      <ThumbStorage />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    background: state.background,
  };
};

export default connect(mapStateToProps)(AppContainer);
