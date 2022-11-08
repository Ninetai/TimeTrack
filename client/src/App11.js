import { graphql, ApolloClient as Client, ApolloProvider } from "react-apollo";
// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'https://flyby-gateway.herokuapp.com/',
  cache: new InMemoryCache(),
});
// const client = new ApolloClient({
//     networkInterface: mockNetworkInterface,
// });

// client
//   .query({
//     query: gql`
//       query GetLocations {
//         locations {
//           id
//           name
//           description
//           photo
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));
const channelsListQuery = gql`
   query ChannelsListQuery {
     channels {
       id
       name
     }
   }`;
const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);
const NotFound = () => {
  return <div>NotFound</div>;
};

const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  } return <ul>
    {channels.map(ch => <li key={ch.id}>{ch.name}</li>)}
  </ul>;
};

export default function App() {


  return (

    <ApolloProvider client={client}>
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Apollo</h2>
        </div>
        <ChannelsListWithData />
      </div>
    </ApolloProvider>
  )
};