import docker
client = docker.from_env()

web_servers = {}
event_filters = {'type': 'container', 'label': 'com.type=proxyable'}
for event in client.events(filters=event_filters, decode=True):
    if event['status'] == 'start':
        web_servers[event['id']] = client.containers.get(event['id'])
    elif event['status'] == 'stop':
        del web_servers[event['id']]
    else:
        continue
    print("Received {} event for container {}".format(event['status'], event['id']))
