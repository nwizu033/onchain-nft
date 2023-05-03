// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

// import "base64-sol/base64.sol";

contract OnchainNFT is ERC721URIStorage {
    uint256 private s_tokenCounter;

    struct NFTData {
        string name;
        string description;
        string image;
    }

    mapping(uint256 => NFTData) public _nftData;

    string svgg =
        '<svg width="400" height="110"><rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"/></svg>';

    constructor() ERC721("Onchain NFT", "ONFT") {}

    // mint function
    function mintNft(string memory name, string memory description) public {
        // set svg to image uri
        string memory Image = svgToImageURI(svgg);
        // mint
        uint256 tokenId = s_tokenCounter + 1;
        _mint(msg.sender, tokenId);
        _nftData[tokenId] = NFTData(name, description, Image);

        // generate the token uri
        string memory tokenURI = generateTokenURI(tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function svgToImageURI(
        string memory svg
    ) public pure returns (string memory) {
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(
            bytes(string(abi.encodePacked(svg)))
        );
        return string(abi.encodePacked(baseURL, svgBase64Encoded));
    }

    function generateTokenURI(
        uint256 tokenId
    ) private view returns (string memory) {
        // Get the NFT data for the given tokenId
        NFTData memory nftData = _nftData[tokenId];

        // Create the metadata JSON object
        string memory json = string(
            abi.encodePacked(
                "{",
                '"name": "',
                nftData.name,
                '",',
                '"description": "',
                nftData.description,
                '",',
                '"image": "',
                nftData.image,
                '",',
                "}"
            )
        );
        // generate the tokenUri by base64-encoding the metadata json
        string memory tokenURI = string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(bytes(json))
            )
        );

        return tokenURI;
    }
}
