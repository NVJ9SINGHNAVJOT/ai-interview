#!/bin/bash

source ./logging.sh

# Create the aiinterview-backend-proxy network (internal)
create_aiinterview_backend_proxy_network() {
  # Check if the network already exists
  if docker network ls | grep -w "aiinterview-backend-proxy" > /dev/null 2>&1; then
    loginf "Network 'aiinterview-backend-proxy' already exists."
  else
    loginf "Creating internal network 'aiinterview-backend-proxy'..."
    if docker network create --driver bridge --internal "aiinterview-backend-proxy"; then
      logsuccess "'aiinterview-backend-proxy' network created."
    else
      logerr "Error: Failed to create network 'aiinterview-backend-proxy'."
      exit 1
    fi
    
  fi
}

create_aiinterview_backend_proxy_network
