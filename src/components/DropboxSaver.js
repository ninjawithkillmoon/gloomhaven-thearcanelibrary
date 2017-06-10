import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class DropboxSaverComponent extends Component {

  saveToDropbox() {

  }

  render() {
    return (
        <div className="">
          { window.Dropbox.isBrowserSupported() && 
            <Button className="btn-scoundrel" onClick={() => this.saveToDropbox()}><Glyphicon glyph="cloud-upload" /> Save</Button>
          }
        </div>
    );
  }
}

export default DropboxSaverComponent;