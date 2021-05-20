# action-bump-version

GitHub Action for automated version bump in VERSION file.

This Action bumps the version in given VERSION file. 
Using this action you can bump your project version on 
every successful push.

**Attention**

Make sure you use the `actions/checkout@v2` action!

## Usage:
You need to create file VERSION in which you can specify 
current version of your project. If you do not the file will
be created with default 1.0.0 version.
You have to create your own workflow using this action.
Example : 
```yaml
      - name: Automated Version Bump 
        id: version-bump
        uses: ./
      - name: Get the output version
        run: echo "The output version is ${{ steps.version-bump.outputs.output-version }}"
```

* You can specify your own key words into inputs example : 
** Use only capital words ** 
```yaml
      - name: Automated Version Bump 
        id: version-bump
        uses: ./
        with:
          major-flags-words: 'MAJOR, BIG'
          minor-flags-words: 'MINOR, MID'
          patch-flags-words: 'PATCH, SMALL'
      - name: Get the output version
        run: echo "The output version is ${{ steps.version-bump.outputs.output-version }}"
```
