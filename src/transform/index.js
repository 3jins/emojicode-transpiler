import convertToken from './convertToken';

export default tokenStream => tokenStream.map(token => convertToken(token));
