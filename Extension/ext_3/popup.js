
const windows = await chrome.windows.getAll();

const collator = new Intl.Collator();
windows.sort((a, b) => collator.compare(b.id, a.id));  // assume larger ids = created later

for (const window of windows) {
  const window_tabs = await chrome.tabs.query({"windowId": window.id});
  window_tabs.sort((a, b) => collator.compare(b.index, a.index));

  const window_div = document.createElement("div");
  const window_h3 = document.createElement("h3");
  const window_text = document.createTextNode(window.id);
  window_h3.appendChild(window_text);
  window_div.appendChild(window_h3);

  const records = [];
  for (const tab of window_tabs) {
    const record = {};
    record["window_id"] = tab.windowId;
    record["tab_id"] = tab.id;
    record["tab_index"] = tab.index;
    record["tab_url"] = tab.url;
    records.push(record);
    console.log(record)

    const tab_p = document.createElement("p");
    const tab_url_text = document.createTextNode(tab.url);
    tab_p.appendChild(tab_url_text);

    tab_p.addEventListener("click", async () => {
      console.log('focusing: ' + tab.id);
      await chrome.tabs.update(tab.id, { active: true });
      await chrome.windows.update(tab.windowId, { focused: true });
    });
    window_div.appendChild(tab_p);
  }
  document.getElementById("window_groups").appendChild(window_div);
}

/// STORAGE KEYS



console.log('----------------')
chrome.storage.local.get(null, function(items) {
  var storage_keys = Object.keys(items);
  storage_keys.sort().reverse();
  console.log(storage_keys);

  const states_div = document.createElement("div");
  const states_h3 = document.createElement("h3");
  const states_text = document.createTextNode("Saved States:");
  states_h3.appendChild(states_text);
  states_div.append(states_h3);

  // printing
  for (const key of storage_keys) {
    console.log('----------------')
    console.log(key)

    // may want template for this if doing load/delete functionality
    // need listener for each button...
    const state_div = document.createElement("div");
    const state_div_text = document.createTextNode(key);
    state_div.appendChild(state_div_text);

    const state_div_reload_button = document.createElement("button");
    const state_div_reload_button_text = document.createTextNode("load");
    state_div_reload_button.appendChild(state_div_reload_button_text);
  
    const state_div_delete_button = document.createElement("button");
    const state_div_delete_button_text = document.createTextNode("delete");
    state_div_delete_button.appendChild(state_div_delete_button_text);
    state_div.appendChild(state_div_reload_button);
    state_div.appendChild(state_div_delete_button);

    // reload
    state_div_reload_button.addEventListener("click", async () => {
      console.log('reload: ' + key);
      chrome.storage.local.get([key]).then((result) => {
        console.log(result);
      });
    });
    // delete
    state_div_delete_button.addEventListener("click", async () => {
      console.log('delete: ' + key);
      chrome.storage.local.remove([key], function(){
        var error = chrome.runtime.lastError;
          if (error) {
            console.error(error);
          }
      });
      window.location.reload();
    });

    states_div.appendChild(state_div);

    chrome.storage.local.get([key]).then((result) => {
      console.log(result)
    });
  }
  document.getElementById("saved_states").appendChild(states_div);
});





// 09/16/2023 LTS - the export+restore is meant to be machine scale
// the "last" view of a session right
// so does not need to be human readable
// going to save as json for easier reading+unpacking
// .rad
const download_json = function (data, session_name) {
  var fname = session_name + ".json";
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  var dlAnchorElem = document.createElement('a')
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", fname);
  dlAnchorElem.click();
  console.log('logging from download')
}
const get_data_for_export = async function() {
  console.log('export clicked')

  
  const windows = await chrome.windows.getAll();

  const collator = new Intl.Collator();
  windows.sort((a, b) => collator.compare(b.id, a.id));  // assume larger ids = created later

  // using list to preserve sort order for reconstruction
  // will need.reverse on read
  const windows_records = [];
  for (const window of windows) {
    const window_tabs = await chrome.tabs.query({"windowId": window.id});
    window_tabs.sort((a, b) => collator.compare(b.index, a.index));
    const records = [];
    for (const tab of window_tabs) {
      const record = {};
      record["window_id"] = tab.windowId;
      record["tab_id"] = tab.id;
      record["tab_index"] = tab.index;
      record["tab_url"] = tab.url;
      records.push(record);
    }
    windows_records.push(records);
  }

  const write_record = {};
  write_record["windows_records"] = windows_records;
  const timestamp = Date.now();
  write_record["timestamp"] = timestamp;
  console.log(write_record)

  const session_name = "RAidER" + "_" + timestamp;
  chrome.storage.local.set({ [session_name]: write_record }).then(() => {
    console.log("Saved session:" + " " + session_name);
  });

  //download_json(write_record, session_name);
  window.location.reload();  // forces reload to update html
}

const button_export_state = document.getElementById('button_export_state');
button_export_state.addEventListener("click", get_data_for_export)

// this does work, but lose logs on popup reload
//chrome.tabs.onCreated.addListener(function(tab) {
//  console.log('tab created: ' + tab.id)
//})

//chrome.tabs.onRemoved.addListener(function(tab) {
//  console.log('tab removed: ' + tab.id)
//})
