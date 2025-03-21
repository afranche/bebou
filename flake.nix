{
  description = ''
    Development environment flake
  '';

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  inputs.devshell.url = "github:numtide/devshell";
  inputs.devshell.inputs.nixpkgs.follows = "nixpkgs";

  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils, devshell }:
    flake-utils.lib.eachDefaultSystem (system: {
      devShell =
        let
          pkgs = import nixpkgs {
            inherit system;

            overlays = [ devshell.overlays.default ];
            config.allowUnfree = true;
          };
        in
          pkgs.devshell.mkShell {
            devshell.name = "bebou";
            devshell.motd = ''
            {bold}{1}breathe <3
            $(type -p menu &>/dev/null && menu)
            '';
            devshell.packages = with pkgs; [
              bun
            ];
          };
      });
}
