var html = require('choo/html')
var objectValues = require('object-values')
var wrapper = require('../components/wrapper')
var format = require('../components/format')
var unorphan = require('../components/unorphan')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
    <div class="x xw c12 px1" style="margin-bottom: -1rem">
      ${objectValues(state.page.children).reverse().map(entry)}
    </div>
  `
}

function entry (props) {
  var image = props.files[props.thumbnail] || { }
  if (props.draft) return // skip the drafts

  return html`
    <div class="c12">
      <a href="${props.url}" class="x xw c12 py2">
        <div class="c8 p1 mb2 ase wmxheading tid" sm="c12">
          <h2>${unorphan(props.title)}</h2>
        </div>
        <div class="c4 p1 ase mb2" sm="c12">
          <div
            class="psr bggreylight ${props.thumbnailborder ? 'ol1' : ''}"
            style="padding-bottom: ${image.ratioY * 100}%"
          >
            <img src="${image.url}" class="psa t0 l0 c12" />
          </div>
        </div>
        <div class="c4 p1" sm="c12">
          <ul>
            <li>${props.date}</li>
            <li>${props.tags.join(', ')}</li>
          </ul>
        </div>
        <div class="c8 p1" sm="c12">
          <div class="copy wmxcopy">
            ${format(props.excerpt)}
          </div>
        </div>
      </a>
      <div class="c12 p1"><div class="bb1"></div></div>
    </div>
  `
}
