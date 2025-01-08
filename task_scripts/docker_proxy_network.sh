#!/bin/bash

source ./logging.sh

# Create the proxy network (external)
create_proxy_network() {
  local network_name="proxy"

  # Check if the network already exists
  if docker network ls --format "{{.Name}}" | grep -w "$network_name" > /dev/null 2>&1; then
    loginf "Network '$network_name' already exists."
  else
    loginf "Creating external network '$network_name'..."
    if docker network create --driver bridge "$network_name"; then
      logsuccess "'$network_name' network created."
    else
      logerr "Error: Failed to create network '$network_name'."
      exit 1
    fi
  fi
}

create_proxy_network
